
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchDoctorFormProps {
  specialty: string;
  name: string;
  onSpecialtyChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSearch: () => void;
  hasResults: boolean;
}

const SearchDoctorForm = ({
  specialty,
  name,
  onSpecialtyChange,
  onNameChange,
  onSearch,
  hasResults
}: SearchDoctorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Input 
            id="specialty" 
            placeholder="e.g. Cardiologist, Pediatrician" 
            value={specialty}
            onChange={(e) => onSpecialtyChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="name">Doctor Name</Label>
          <Input 
            id="name" 
            placeholder="e.g. Dr. Smith" 
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
      </div>

      <Button 
        onClick={onSearch}
        disabled={!hasResults}
        className="w-full bg-medical-primary hover:bg-medical-dark"
      >
        Search Doctors
      </Button>
    </div>
  );
};

export default SearchDoctorForm;

