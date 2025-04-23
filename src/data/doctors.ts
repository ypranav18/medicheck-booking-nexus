
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  availability: {
    day: string;
    slots: string[];
  }[];
}

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    rating: 4.8,
    availability: [
      {
        day: "Monday",
        slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
      },
      {
        day: "Wednesday",
        slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
      },
      {
        day: "Friday",
        slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"]
      }
    ]
  },
  {
    id: 2,
    name: "Dr. James Williams",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    rating: 4.9,
    availability: [
      {
        day: "Tuesday",
        slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
      },
      {
        day: "Thursday",
        slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    rating: 4.7,
    availability: [
      {
        day: "Monday",
        slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
      },
      {
        day: "Wednesday",
        slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
      },
      {
        day: "Friday",
        slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM"]
      }
    ]
  }
];
