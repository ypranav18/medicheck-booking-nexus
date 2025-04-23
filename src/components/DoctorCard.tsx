
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Doctor } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
  onAppointmentSelect?: (doctor: Doctor, day: string, time: string) => void;
}

const DoctorCard = ({ doctor, onAppointmentSelect }: DoctorCardProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 h-full">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="h-64 sm:h-full w-full object-cover"
          />
        </div>
        <div className="sm:w-2/3">
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <CardTitle className="text-xl font-bold">{doctor.name}</CardTitle>
                <CardDescription className="text-gray-600">{doctor.specialty}</CardDescription>
              </div>
              <Badge className="bg-medical-primary hover:bg-medical-dark">
                ★ {doctor.rating}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-medical-primary" />
                Available Days
              </h4>
              <div className="flex flex-wrap gap-2">
                {doctor.availability.map(avail => (
                  <Button
                    key={avail.day}
                    variant={selectedDay === avail.day ? "default" : "outline"}
                    size="sm"
                    className={selectedDay === avail.day ? 
                      "bg-medical-primary hover:bg-medical-dark" : 
                      "border-medical-primary text-medical-primary hover:bg-medical-light"
                    }
                    onClick={() => setSelectedDay(avail.day)}
                  >
                    {avail.day}
                  </Button>
                ))}
              </div>
            </div>

            {selectedDay && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-medical-primary" />
                  Available Time Slots
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability
                    .find(avail => avail.day === selectedDay)?.slots
                    .map(time => (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        className="border-medical-secondary text-medical-secondary hover:bg-medical-light"
                        onClick={() => onAppointmentSelect && onAppointmentSelect(doctor, selectedDay, time)}
                      >
                        {time}
                      </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-medical-primary hover:bg-medical-dark">
              {selectedDay ? 'Book Appointment' : 'View Profile'}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;
