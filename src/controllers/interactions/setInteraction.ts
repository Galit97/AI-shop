import { Interaction } from "../../models/interactionModel";

export async function setInteraction(req: any, res: any) {
    const { clientId, productId, type, score } = req.body;

  try {

    let interactionExist = await Interaction.findOne({ clientId, productId, type: 'rating'});

    if( interactionExist ) {
        interactionExist.score = score;
        await interactionExist.save();
    } else {
        const interaction = new Interaction({ clientId, productId, type, score });
        await interaction.save();
    }

    res.status(201).json({ message: 'Interaction logged successfully' });
  } catch (error) {
    console.error('Error logging interaction:', error);
    res.status(500).json({ error: 'Failed to log interaction' });
  }

};