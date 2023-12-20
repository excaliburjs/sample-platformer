import { Player } from '../actors/player';

export interface iArtifact {
    activateArtifact(player: Player): void;
};