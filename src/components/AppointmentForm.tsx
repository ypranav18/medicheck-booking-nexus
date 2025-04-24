
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctors, Doctor } from "@/data/doctors";
import { Search, Calendar, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import SearchDoctorForm from "./appointment/SearchDoctorForm";
import DoctorsList from "./appointment/DoctorsList";
import AppointmentDetailsForm from "./appointment/AppointmentDetailsForm";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isRedirecting && !user) {
      navigate("/signin");
    }
  }, [isRedirecting, user, navigate]);

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
      if (!user) {
        toast.error("Please sign in to book an appointment");
        setIsRedirecting(true);
        return;
      }

      if (!selectedDoctor || !selectedDay || !selectedTime) {
        toast.error("Please select a doctor, day and time");
        return;
      }

      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          doctor_id: selectedDoctor.id.toString(),
          doctor_name: selectedDoctor.name,
          doctor_specialty: selectedDoctor.specialty,
          appointment_date: selectedDay,
          appointment_time: selectedTime,
          reason: appointmentReason,
        });

      if (appointmentError) {
        throw appointmentError;
      }

      const { error: emailError } = await supabase.functions.invoke('send-appointment-confirmation', {
        body: {
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty,
          date: selectedDay,
          time: selectedTime,
          patientEmail: user.email,
          patientName: user.user_metadata?.name || user.email?.split('@')[0] || 'Patient',
          reason: appointmentReason,
        },
      });

      if (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      toast.success("Appointment booked successfully!", {
        description: `Your appointment with ${selectedDoctor.name} on ${selectedDay} at ${selectedTime} has been confirmed.`,
        duration: 5000,
      });
      
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

          <TabsContent value="search">
            <SearchDoctorForm
              specialty={specialty}
              name={name}
              onSpecialtyChange={setSpecialty}
              onNameChange={setName}
              onSearch={() => setActiveTab("select")}
              hasResults={filteredDoctors.length > 0}
            />
          </TabsContent>

          <TabsContent value="select">
            {filteredDoctors.length > 0 ? (
              <DoctorsList 
                doctors={filteredDoctors}
                onAppointmentSelect={handleAppointmentSelect}
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No doctors match your search criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details">
            {selectedDoctor && selectedDay && selectedTime && (
              <AppointmentDetailsForm
                selectedDoctor={selectedDoctor}
                selectedDay={selectedDay}
                selectedTime={selectedTime}
                appointmentReason={appointmentReason}
                onReasonChange={setAppointmentReason}
                onSubmit={handleSubmit}
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;

