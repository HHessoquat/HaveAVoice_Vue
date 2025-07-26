import type Choice from "../Choice.ts";

export interface ElectionWriteDTO {
    name: string;
    description: string;
    organizer_id: number;
    dateStart: Date;
    dateEnd: Date;
    choices: Choice[];
}