// Format: icon|name|type(c/p/e/s)|duration(i/s/d/w/-)|power|utility|uses|tags|description|effect|family|flags(R=reality-altering)
export const GENERAL = `
🧪|Minor Healing Draught|c|i|1|6|1|healing,survival|A small vial of glowing red tonic.|Instantly mends minor wounds and fatigue.|healing-draught
🧪|Greater Healing Draught|c|i|3|7|1|healing,survival|A thick crimson elixir that knits flesh in seconds.|Instantly heals serious (non-fatal) injuries.|healing-draught
🍀|Lucky Charm|c|s|2|5|1|luck|A four-leaf token that hums faintly in your pocket.|For one scene, small coincidences break in your favour.|luck
🗺️|Pathfinder's Map|c|d|2|6|1|navigation,knowledge|A blank map that inks itself as you walk.|For one day you always know the way to your current destination.|navigation
💬|Silver Tongue Tonic|c|s|3|6|1|social,charisma|Tastes of honey and confidence.|Your words are unusually persuasive for one scene.|persuasion
🗝️|Skeleton Key|c|i|2|5|3|utility,stealth|A key that reshapes itself to fit mundane locks.|Opens one ordinary lock per use (3 uses).|lockpick
📜|Scroll of Insight|c|i|2|6|1|knowledge,mystery|A scroll that answers exactly one question.|Receive a short, truthful hint about the current mystery.|insight
🤝|Information Broker|s|i|2|6|1|knowledge,social|A faceless contact from the System network.|Receive one reliable rumour about a person or place.|broker
🐎|Summoned Steed|s|d|3|5|1|travel|A spectral horse answers your whistle.|A tireless mount serves you for one day.|steed
🎒|Bottomless Satchel|e|-|3|7|1|storage,utility|A worn leather bag far larger on the inside.|Carry up to a wagonload of goods at no weight.|storage
🛡️|Second Wind|p|-|3|6|1|survival,endurance|An ingrained reserve of stamina.|Once per scene, shrug off exhaustion and keep going.|endurance
👁️|Danger Sense|p|-|4|7|1|perception,survival|A prickle at the back of your neck that is never wrong.|You get a brief warning before any ambush or imminent threat.|danger-sense
🧭|Fate Compass|e|-|5|7|1|luck,navigation|Its needle points toward what you most need.|Always points to the nearest thing that would advance your current goal.|fate-compass
⏳|Time Pocket|c|i|6|8|1|time|A cracked hourglass holding a few stolen seconds.|Rewind the last few seconds once and redo a single action.|time-pocket
🌟|Protagonist's Destiny|p|-|8|9|1|luck,fate|The System marks you as the main character.|Fate ensures you are never killed by pure bad luck or random chance.|destiny
🌀|Wish Fragment|c|i|9|10|1|reality,wish|A sliver of crystallised possibility.|Make one moderate, lasting change to reality within the System's rules.|wish|R
`;

export const SUPERNATURAL = `
👻|Spirit Sight Drops|c|s|2|6|1|perception,spirits|Eye drops brewed from graveyard dew.|See and hear ghosts and spirits for one scene.|spirit-sight
👻|Medium's Eye|p|-|4|6|1|perception,spirits|The veil between worlds thins around you.|Permanently see, hear and speak with spirits.|spirit-sight
🦇|Night Vision|p|-|2|5|1|perception|Your pupils gleam like a cat's.|See clearly in near-total darkness.|night-vision
🌑|Shadow Step|c|i|3|7|2|stealth,teleport|Two vials of liquid darkness.|Step into one shadow and out of another within sight (2 uses).|shadow-step
🌑|Shadow Walker|p|-|6|8|1|stealth,teleport|Shadows become doorways for you.|Teleport between shadows within sight at will, a few times per scene.|shadow-step
🧠|Telekinesis (Novice)|p|-|3|6|1|telekinesis|Objects tremble when you concentrate.|Move small objects (up to a book) with your mind.|telekinesis
🧠|Telekinesis (Adept)|p|-|5|7|1|telekinesis|Your will has weight.|Lift and throw objects up to a person's weight with your mind.|telekinesis
🧠|Telekinesis (Master)|p|-|8|9|1|telekinesis|The world bends to your thoughts.|Lift vehicles, stop projectiles and fly short distances by thought.|telekinesis
💭|Mind Reading Draught|c|s|4|7|1|telepathy,mind|A bitter tea that tastes of other people's secrets.|Hear the surface thoughts of one chosen person for one scene.|telepathy
💭|Telepathy|p|-|6|8|1|telepathy,mind|Thoughts brush against yours like whispers.|Read surface thoughts and speak mind-to-mind with people nearby.|telepathy
🔥|Pyrokinesis Spark|p|-|4|6|1|elemental,fire|A warmth that never leaves your fingertips.|Conjure and shape flames up to the size of a campfire.|pyrokinesis
🩸|Regeneration|p|-|6|8|1|healing,body|Your cells remember how to heal.|Recover from most injuries within hours; minor wounds close in minutes.|regeneration
👁️|Precognitive Flash|c|i|5|8|1|precognition|A shard of a possible future.|Glimpse the likely outcome of your next decision before making it.|precognition
🐺|Beast Form Elixir|c|s|5|6|1|shapeshift,body|A draught that smells of pine and wild things.|Transform into a powerful animal for one scene, then return.|shapeshift
🌫️|Phase Tonic|c|s|6|8|1|phase,stealth|Your body feels like smoke.|Pass through walls and ignore physical attacks for one scene.|phase
💀|Death's Reprieve|c|i|8|9|1|survival,resurrection|A black coin to pay the ferryman twice.|Survive one otherwise fatal event with a single hit point.|reprieve
⏱️|Time Stop|c|i|9|10|1|time|A silver pocket watch with no hands.|Freeze time for roughly ten seconds; only you can act.|time-stop|R
`;
