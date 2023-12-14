import { Player } from './player';

export interface iArtifact {
    activateArtifact(player: Player): void;
};