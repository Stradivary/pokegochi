// BerryAdapter.ts
import { berrySchema, Berry } from '../../../domain/entities/Berries'; // replace 'YourFileName' with the actual filename where Berry is defined
import { berryDTOSchema, BerryDTO } from '../../../domain/entities/Berries/DTO';

export class BerryAdapter {
    /**
     * Converts a Berry object to a BerryDTO object.
     *
     * @param {Berry} berry - The Berry object to be converted.
     * @return {BerryDTO} The converted BerryDTO object.
     */
    static toDTO(berry: Berry): BerryDTO {
        // Perform the conversion from Berry to BerryDTO here
        // You may need to modify field names or perform additional transformations
        return berryDTOSchema.parse(berry);
    }

    static fromDTO(dto: BerryDTO): Berry {
        // Perform the conversion from BerryDTO to Berry here
        // You may need to modify field names or perform additional transformations
        return berrySchema.parse(dto);
    }
}