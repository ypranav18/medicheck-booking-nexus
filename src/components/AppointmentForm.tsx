import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctors, Doctor } from "@/data/doctors";
import DoctorCard from "@/components/DoctorCard";
import { toast } from "sonner";
import { Search, Calendar, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReason, setAppointmentReason] = useState("");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSpecialty = specialty === "" || 
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase());
    const matchesName = name === "" || 
      doctor.name.toLowerCase().includes(name.toLowerCase());
    return matchesSpecialty && matchesName;
  });

  const handleAppointmentSelect = (doctor: Doctor, day: string, time: string) => {
    setSelectedDoctor(doctor);
    setSelectedDay(day);
    setSelectedTime(time);
    setActiveTab("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to book an appointment");
        navigate("/signin");
        return;
      }

      if (!selectedDoctor || !selectedDay || !selectedTime) {
        toast.error("Please select a doctor, day and time");
        return;
      }

      // Store appointment in Supabase
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([
          {
            user_id: user.id,
            doctor_id: selectedDoctor.id,
            doctor_name: selectedDoctor.name,
            doctor_specialty: selectedDoctor.specialty,
            appointment_date: selectedDay,
            appointment_time: selectedTime,
            reason: appointmentReason,
          }
        ]);

      if (appointmentError) {
        throw appointmentError;
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-appointment-confirmation', {
        body: {
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty,
          date: selectedDay,
          time: selectedTime,
          patientEmail: user.email,
          patientName: user.email?.split('@')[0] || 'Patient',
          reason: appointmentReason,
        },
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't throw here - appointment was saved successfully
      }

      toast.success("Appointment booked successfully!", {
        description: `Your appointment with ${selectedDoctor.name} on ${selectedDay} at ${selectedTime} has been confirmed.`,
        duration: 5000,
      });
      
      // Reset form
      setSpecialty("");
      setName("");
      setSelectedDoctor(null);
      setSelectedDay(null);
      setSelectedTime(null);
      setAppointmentReason("");
      setActiveTab("search");
      
    } catch (error: any) {
      toast.error("Failed to book appointment", {
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-medical-primary">Book Your Appointment</CardTitle>
        <CardDescription className="text-center">Find a doctor and schedule your visit</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="search" className="data-[state=active]:bg-medical-primary data-[state=active]:text-white flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Doctor
            </TabsTrigger>
            <TabsTrigger value="select" disabled={!filteredDoctors.length} className="data-[state=active]:bg-medical-primary data-[state=active]:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Select Time
            </TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedDoctor} className="data-[state=active]:bg-medical-primary data-[state=active]:text-white flex items-center gap-2">
              <Check className="h-4 w-4" />
              Confirm
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input 
                  id="specialty" 
                  placeholder="e.g. Cardiologist, Pediatrician" 
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Doctor Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Dr. Smith" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={() => setActiveTab("select")}
              disabled={!filteredDoctors.length}
              className="w-full bg-medical-primary hover:bg-medical-dark"
            >
              Search Doctors
            </Button>
          </TabsContent>

          <TabsContent value="select" className="space-y-6">
            {filteredDoctors.length > 0 ? (
              <div className="space-y-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard 
                    key={doctor.id} 
                    doctor={doctor} 
                    onAppointmentSelect={handleAppointmentSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No doctors match your search criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details">
            {selectedDoctor && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 bg-medical-light rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Appointment Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Doctor</p>
                      <p className="font-medium">{selectedDoctor.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Specialty</p>
                      <p className="font-medium">{selectedDoctor.specialty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{selectedDay}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Input 
                    id="reason" 
                    placeholder="Brief description of your symptoms or reason for appointment"
                    value={appointmentReason}
                    onChange={(e) => setAppointmentReason(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-medical-primary hover:bg-medical-dark"
                >
                  Confirm Appointment
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
