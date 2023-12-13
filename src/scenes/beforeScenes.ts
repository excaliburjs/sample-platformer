import { BeforeLevelScene, iSceneNode } from '../storyScene';

export class BeforeLevel1 extends BeforeLevelScene implements iSceneNode {

    nextScene = "level1";
    thisScene = "beforeLevel1";

    public text = [
        "De code voor het eerste level vind je in src/scenes/level1.ts\n" +
        "Kijk eerst maar eens of je dat kan vinden in de EDITOR.",
        "Als je het level probeert zie je dat ik niet bij de volgende vloer\n" +
        "kan komen.\n" +
        "Kan jij ervoor zorgen dat hij lager staat?"
    ]
}

export class BeforeLevel2 extends BeforeLevelScene {
    nextScene = "level2";
    thisScene = "beforeLevel2";

    public text = [
        "Goed gedaan!\n" +
        "In het volgende level is een vloer niet lang genoeg.\n" +
        "De code voor dit level vind je in src/scenes/level2.ts\n" +
        "Kan jij ervoor zorgen dat hij langer wordt?"
    ]
}

