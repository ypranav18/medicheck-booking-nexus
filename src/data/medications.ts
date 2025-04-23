
export interface Medication {
  id: number;
  name: string;
  description: string;
}

export interface Interaction {
  id: number;
  med1Id: number;
  med2Id: number;
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
}

export const medications: Medication[] = [
  {
    id: 1,
    name: "Aspirin",
    description: "Pain reliever and anti-inflammatory drug."
  },
  {
    id: 2,
    name: "Lisinopril",
    description: "ACE inhibitor used to treat high blood pressure and heart failure."
  },
  {
    id: 3,
    name: "Metformin",
    description: "Used to treat type 2 diabetes."
  },
  {
    id: 4,
    name: "Atorvastatin",
    description: "Statin medication used to prevent cardiovascular disease."
  },
  {
    id: 5,
    name: "Simvastatin",
    description: "Statin medication used to lower cholesterol levels."
  },
  {
    id: 6,
    name: "Warfarin",
    description: "Anticoagulant used to treat blood clots."
  }
];

export const interactions: Interaction[] = [
  {
    id: 1,
    med1Id: 1,
    med2Id: 6,
    severity: 'severe',
    description: "Taking aspirin with warfarin can significantly increase the risk of bleeding.",
    recommendation: "Avoid this combination unless specifically directed by your doctor. If both medications are necessary, close monitoring of INR levels is required."
  },
  {
    id: 2,
    med1Id: 4,
    med2Id: 5,
    severity: 'moderate',
    description: "Taking multiple statin medications can increase the risk of muscle damage and rhabdomyolysis.",
    recommendation: "Avoid taking multiple statin medications. If you need additional cholesterol management, discuss alternative options with your doctor."
  },
  {
    id: 3,
    med1Id: 1,
    med2Id: 2,
    severity: 'moderate',
    description: "Aspirin may decrease the effectiveness of lisinopril in lowering blood pressure.",
    recommendation: "Monitor blood pressure closely if taking these medications together. Your doctor may need to adjust your dosage."
  },
  {
    id: 4,
    med1Id: 2,
    med2Id: 3,
    severity: 'minor',
    description: "Lisinopril and metformin may both lower blood sugar, which could potentially lead to hypoglycemia.",
    recommendation: "Monitor blood sugar levels if taking these medications together, especially when starting or changing doses."
  }
];

// Helper function to find interactions between selected medications
export const findInteractions = (medicationIds: number[]): Interaction[] => {
  const results: Interaction[] = [];
  
  // Check each possible pair of medications
  for (let i = 0; i < medicationIds.length; i++) {
    for (let j = i + 1; j < medicationIds.length; j++) {
      const med1Id = medicationIds[i];
      const med2Id = medicationIds[j];
      
      // Look for interactions in both directions (med1-med2 or med2-med1)
      const interaction = interactions.find(
        inter => (inter.med1Id === med1Id && inter.med2Id === med2Id) || 
                 (inter.med1Id === med2Id && inter.med2Id === med1Id)
      );
      
      if (interaction) {
        results.push(interaction);
      }
    }
  }
  
  return results;
};

// Get medication by ID
export const getMedicationById = (id: number): Medication | undefined => {
  return medications.find(med => med.id === id);
};
