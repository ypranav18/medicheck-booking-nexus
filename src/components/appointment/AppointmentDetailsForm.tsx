
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/data/doctors";

interface AppointmentDetailsFormProps {
  selectedDoctor: Doctor;
  selectedDay: string;
  selectedTime: string;
  appointmentReason: string;
  onReasonChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AppointmentDetailsForm = ({
  selectedDoctor,
  selectedDay,
  selectedTime,
  appointmentReason,
  onReasonChange,
  onSubmit
}: AppointmentDetailsFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          onChange={(e) => onReasonChange(e.target.value)}
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
  );
};

export default AppointmentDetailsForm;

