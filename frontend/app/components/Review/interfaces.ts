import { LocationType } from "@/app/store/interfaces";

export const predefinedClues: string[] = [
    'Near a Park',
    'Close to Public Transportation',
    'Nearby School',
    'Near Shopping Center',
    'Landmark: Museum',
    'Close to Hospital',
    'Proximity to a Major Street',
    'Near a Recreational Area',
    'Close to a Community Center'
];

export interface ReviewData {
    clueDescriptions: { [key: string]: string }; // Object with clues as keys and descriptions as values
    review: string;
    location: LocationType,
}