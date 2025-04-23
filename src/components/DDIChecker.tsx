
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { medications, findInteractions, getMedicationById, Interaction } from "@/data/medications";

const DDIChecker = () => {
  const [selectedMeds, setSelectedMeds] = useState<number[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (selectedMeds.length >= 2) {
      const results = findInteractions(selectedMeds);
      setInteractions(results);
    } else {
      setInteractions([]);
    }
  }, [selectedMeds]);

  const handleAddMedication = (medId: string) => {
    const id = parseInt(medId);
    if (!selectedMeds.includes(id)) {
      setSelectedMeds([...selectedMeds, id]);
    }
  };

  const handleRemoveMedication = (id: number) => {
    setSelectedMeds(selectedMeds.filter(medId => medId !== id));
  };

  const handleCheckInteractions = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedMeds([]);
    setInteractions([]);
    setShowResults(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-orange-500';
      case 'minor':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'severe':
        return <AlertCircle className="h-5 w-5" />;
      case 'moderate':
        return <AlertCircle className="h-5 w-5" />;
      case 'minor':
        return <Info className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-medical-primary">
          Drug Interaction Checker
        </CardTitle>
        <CardDescription className="text-center">
          Check for potential interactions between your medications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Label htmlFor="medication">Add Medication</Label>
              <Select onValueChange={handleAddMedication}>
                <SelectTrigger id="medication">
                  <SelectValue placeholder="Select a medication" />
                </SelectTrigger>
                <SelectContent>
                  {medications.map(med => (
                    <SelectItem 
                      key={med.id} 
                      value={med.id.toString()}
                      disabled={selectedMeds.includes(med.id)}
                    >
                      {med.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleCheckInteractions}
                disabled={selectedMeds.length < 2}
                className="w-full bg-medical-secondary hover:bg-medical-dark"
              >
                Check Interactions
              </Button>
            </div>
          </div>

          {selectedMeds.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Selected Medications:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedMeds.map(medId => {
                  const med = getMedicationById(medId);
                  return med && (
                    <Badge 
                      key={medId} 
                      className="bg-medical-light text-medical-primary flex items-center gap-1 pl-3 py-1.5"
                    >
                      {med.name}
                      <button 
                        onClick={() => handleRemoveMedication(medId)}
                        className="ml-1 hover:bg-medical-primary hover:text-white rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {showResults && (
          <div className="mt-8 space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">Interaction Results</h3>
            
            {interactions.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>No interactions found</AlertTitle>
                <AlertDescription>
                  Good news! No known interactions were found between your selected medications.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {interactions.map(interaction => {
                  const med1 = getMedicationById(interaction.med1Id);
                  const med2 = getMedicationById(interaction.med2Id);
                  
                  return (
                    <Alert key={interaction.id} variant="default" className="border-l-4" style={{ borderLeftColor: getSeverityColor(interaction.severity) }}>
                      <div className="flex items-start">
                        <div className={`mr-3 ${interaction.severity === 'severe' ? 'text-red-500' : interaction.severity === 'moderate' ? 'text-orange-500' : 'text-yellow-500'}`}>
                          {getSeverityIcon(interaction.severity)}
                        </div>
                        <div className="space-y-2">
                          <AlertTitle className="text-base font-medium flex items-center gap-2">
                            {med1?.name} + {med2?.name}
                            <Badge className={getSeverityColor(interaction.severity)}>
                              {interaction.severity.charAt(0).toUpperCase() + interaction.severity.slice(1)}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription>
                            <p className="mb-2">{interaction.description}</p>
                            <p className="text-sm font-medium">Recommendation:</p>
                            <p className="text-sm">{interaction.recommendation}</p>
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="border-medical-primary text-medical-primary hover:bg-medical-light"
        >
          Reset
        </Button>
        <div className="text-sm text-gray-500">
          Always consult with your healthcare provider about medication interactions.
        </div>
      </CardFooter>
    </Card>
  );
};

export default DDIChecker;
