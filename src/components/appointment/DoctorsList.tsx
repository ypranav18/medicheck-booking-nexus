
import { Doctor } from "@/data/doctors";
import DoctorCard from "@/components/DoctorCard";

interface DoctorsListProps {
  doctors: Doctor[];
  onAppointmentSelect: (doctor: Doctor, day: string, time: string) => void;
}

const DoctorsList = ({ doctors, onAppointmentSelect }: DoctorsListProps) => {
  return (
    <div className="space-y-6">
      {doctors.map(doctor => (
        <DoctorCard 
          key={doctor.id} 
          doctor={doctor} 
          onAppointmentSelect={onAppointmentSelect}
        />
      ))}
    </div>
  );
};

export default DoctorsList;

