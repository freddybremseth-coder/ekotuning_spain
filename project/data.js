/* Ecotuning España — machine data for the power calculator.
   Grouped by machine type. Each model: stock vs optimised (CV/hp & Nm),
   engine code, and emission stage — mirroring Ekotuning's "Find Your Tune" table.
   Figures are realistic estimates; identical in both languages. */
window.MACHINES = {
  tractors: [
    { brand: "John Deere", models: [
      { name: "6120M",  code: "PowerTech 4045", emis: "Stage V", hp: 120, nm: 540, hpT: 142, nmT: 640 },
      { name: "6155R",  code: "PowerTech 6068", emis: "Stage V", hp: 155, nm: 700, hpT: 185, nmT: 840 },
      { name: "6175R",  code: "PowerTech 6068", emis: "Stage V", hp: 175, nm: 740, hpT: 206, nmT: 880 },
      { name: "6215R",  code: "PowerTech 6090", emis: "Stage V", hp: 215, nm: 950, hpT: 248, nmT: 1100 },
      { name: "7R 310", code: "PowerTech 6090", emis: "Stage V", hp: 310, nm: 1300, hpT: 350, nmT: 1480 },
    ]},
    { brand: "Fendt", models: [
      { name: "312 Vario", code: "AGCO Power 44", emis: "Stage V", hp: 123, nm: 560, hpT: 145, nmT: 660 },
      { name: "516 Vario", code: "Deutz TCD 4.1", emis: "Stage V", hp: 163, nm: 720, hpT: 193, nmT: 860 },
      { name: "724 Vario", code: "Deutz TCD 6.1", emis: "Stage V", hp: 238, nm: 1080, hpT: 272, nmT: 1240 },
      { name: "942 Vario", code: "MAN D26",       emis: "Stage V", hp: 415, nm: 1900, hpT: 455, nmT: 2080 },
    ]},
    { brand: "New Holland", models: [
      { name: "T5.120",  code: "FPT F5G",      emis: "Stage V", hp: 117, nm: 525, hpT: 138, nmT: 620 },
      { name: "T6.180",  code: "FPT NEF67",    emis: "Stage V", hp: 175, nm: 740, hpT: 202, nmT: 870 },
      { name: "T7.210",  code: "FPT NEF67",    emis: "Stage V", hp: 180, nm: 800, hpT: 212, nmT: 950 },
      { name: "T7.300",  code: "FPT Cursor 9", emis: "Stage V", hp: 300, nm: 1282, hpT: 342, nmT: 1460 },
    ]},
    { brand: "Case IH", models: [
      { name: "Maxxum 145", code: "FPT NEF67",    emis: "Stage V", hp: 145, nm: 630, hpT: 170, nmT: 740 },
      { name: "Puma 185",   code: "FPT NEF67",    emis: "Stage V", hp: 174, nm: 760, hpT: 205, nmT: 905 },
      { name: "Optum 300",  code: "FPT Cursor 9", emis: "Stage V", hp: 300, nm: 1282, hpT: 340, nmT: 1450 },
    ]},
    { brand: "Massey Ferguson", models: [
      { name: "5S.135", code: "AGCO Power 49", emis: "Stage V", hp: 135, nm: 600, hpT: 158, nmT: 700 },
      { name: "7S.190", code: "AGCO Power 75", emis: "Stage V", hp: 190, nm: 850, hpT: 222, nmT: 990 },
      { name: "8S.265", code: "AGCO Power 84", emis: "Stage V", hp: 265, nm: 1150, hpT: 300, nmT: 1320 },
    ]},
    { brand: "Deutz-Fahr", models: [
      { name: "5125",  code: "Deutz TCD 3.6", emis: "Stage V", hp: 126, nm: 540, hpT: 148, nmT: 640 },
      { name: "6155",  code: "Deutz TCD 6.1", emis: "Stage V", hp: 155, nm: 680, hpT: 182, nmT: 800 },
      { name: "6215",  code: "Deutz TCD 6.1", emis: "Stage V", hp: 215, nm: 920, hpT: 246, nmT: 1060 },
    ]},
    { brand: "Claas", models: [
      { name: "Arion 460", code: "FPT NEF45",    emis: "Stage V", hp: 140, nm: 610, hpT: 165, nmT: 720 },
      { name: "Arion 660", code: "FPT NEF67",    emis: "Stage V", hp: 205, nm: 870, hpT: 238, nmT: 1010 },
      { name: "Axion 870", code: "FPT Cursor 9", emis: "Stage V", hp: 264, nm: 1150, hpT: 300, nmT: 1320 },
    ]},
    { brand: "Valtra", models: [
      { name: "N155", code: "AGCO Power 49", emis: "Stage V", hp: 155, nm: 680, hpT: 183, nmT: 800 },
      { name: "T215", code: "AGCO Power 74", emis: "Stage V", hp: 215, nm: 950, hpT: 248, nmT: 1100 },
    ]},
    { brand: "Kubota", models: [
      { name: "M6-142", code: "Kubota V6108", emis: "Stage V", hp: 141, nm: 610, hpT: 165, nmT: 710 },
      { name: "M7-173", code: "Kubota V6108", emis: "Stage V", hp: 170, nm: 740, hpT: 198, nmT: 860 },
    ]},
  ],

  sprayers: [
    { brand: "John Deere", models: [
      { name: "R4040i",  code: "FPT NEF67",    emis: "Stage V", hp: 173, nm: 760, hpT: 200, nmT: 880 },
      { name: "R4150i",  code: "PowerTech 6090", emis: "Stage V", hp: 230, nm: 1050, hpT: 262, nmT: 1190 },
    ]},
    { brand: "Amazone", models: [
      { name: "Pantera 4504", code: "Deutz TCD 6.1", emis: "Stage V", hp: 218, nm: 950, hpT: 248, nmT: 1080 },
    ]},
    { brand: "Agrifac", models: [
      { name: "Condor V", code: "Deutz TCD 7.8", emis: "Stage V", hp: 250, nm: 1100, hpT: 285, nmT: 1250 },
    ]},
    { brand: "Hardi", models: [
      { name: "Alpha Evo", code: "Cummins 6.7", emis: "Stage V", hp: 228, nm: 1000, hpT: 258, nmT: 1130 },
    ]},
    { brand: "Berthoud", models: [
      { name: "Raptor", code: "Deutz TCD 6.1", emis: "Stage V", hp: 220, nm: 960, hpT: 250, nmT: 1090 },
    ]},
  ],

  combines: [
    { brand: "John Deere", models: [
      { name: "T560", code: "PowerTech 9.0L", emis: "Stage V", hp: 374, nm: 1700, hpT: 410, nmT: 1850 },
      { name: "S790", code: "JD 13.5L",       emis: "Stage V", hp: 473, nm: 2200, hpT: 510, nmT: 2360 },
    ]},
    { brand: "New Holland", models: [
      { name: "CX5.90", code: "FPT Cursor 9",  emis: "Stage V", hp: 258, nm: 1100, hpT: 290, nmT: 1240 },
      { name: "CR9.90", code: "FPT Cursor 16", emis: "Stage V", hp: 571, nm: 2600, hpT: 610, nmT: 2770 },
    ]},
    { brand: "Claas", models: [
      { name: "Tucano 430", code: "Mercedes OM936", emis: "Stage V", hp: 258, nm: 1100, hpT: 290, nmT: 1240 },
      { name: "Lexion 6800", code: "MAN D26",       emis: "Stage V", hp: 408, nm: 1900, hpT: 445, nmT: 2060 },
    ]},
    { brand: "Case IH", models: [
      { name: "Axial-Flow 7250", code: "FPT Cursor 13", emis: "Stage V", hp: 462, nm: 2100, hpT: 500, nmT: 2270 },
    ]},
    { brand: "Deutz-Fahr", models: [
      { name: "C6205", code: "Deutz TCD 6.1", emis: "Stage V", hp: 226, nm: 980, hpT: 256, nmT: 1110 },
    ]},
    { brand: "Massey Ferguson", models: [
      { name: "Beta 7370", code: "AGCO Power 84", emis: "Stage V", hp: 306, nm: 1300, hpT: 340, nmT: 1450 },
    ]},
  ],
};
