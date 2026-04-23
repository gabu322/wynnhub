export interface MountItem {
   name: string;
   bonuses: number[];
}

export interface MountItemGroup {
   minLevel: number;
   items: MountItem[];
}

export const mountItemsByLevel: MountItemGroup[] = [
   {
      minLevel: 1,
      items: [
         { name: "Copper Ingot", bonuses: [0, 0, 0, 4, 0, 8, 0, 0] },
         { name: "Copper Gem", bonuses: [4, 0, 0, 2, 0, 0, 0, 6] },
         { name: "Oak Planks", bonuses: [2, 6, 0, 0, 0, 4, 0, 0] },
         { name: "Oak Paper", bonuses: [0, 0, 8, 0, 0, 0, 4, 0] },
         { name: "Wheat String", bonuses: [0, 2, 0, 0, 4, 0, 6, 0] },
         { name: "Wheat Grains", bonuses: [8, 0, 4, 0, 0, 0, 0, 0] },
         { name: "Gudgeon Oil", bonuses: [0, 0, 2, 0, 6, 0, 0, 4] },
         { name: "Gudgeon Meat", bonuses: [0, 4, 0, 8, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 10,
      items: [
         { name: "Granite Ingot", bonuses: [0, 0, 0, 5, 0, 10, 0, 0] },
         { name: "Granite Gem", bonuses: [5, 0, 0, 2, 0, 0, 0, 8] },
         { name: "Birch Planks", bonuses: [2, 8, 0, 0, 0, 5, 0, 0] },
         { name: "Birch Paper", bonuses: [0, 0, 10, 0, 0, 0, 5, 0] },
         { name: "Barley String", bonuses: [0, 2, 0, 0, 5, 0, 8, 0] },
         { name: "Barley Grains", bonuses: [10, 0, 5, 0, 0, 0, 0, 0] },
         { name: "Trout Oil", bonuses: [0, 0, 2, 0, 8, 0, 0, 5] },
         { name: "Trout Meat", bonuses: [0, 5, 0, 10, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 20,
      items: [
         { name: "Gold Ingot", bonuses: [0, 0, 0, 5, 0, 12, 0, 0] },
         { name: "Gold Gem", bonuses: [6, 0, 0, 3, 0, 0, 0, 9] },
         { name: "Willow Planks", bonuses: [3, 9, 0, 0, 0, 6, 0, 0] },
         { name: "Willow Paper", bonuses: [0, 0, 12, 0, 0, 0, 5, 0] },
         { name: "Oat String", bonuses: [0, 3, 0, 0, 6, 0, 9, 0] },
         { name: "Oat Grains", bonuses: [12, 0, 5, 0, 0, 0, 0, 0] },
         { name: "Salmon Oil", bonuses: [0, 0, 3, 0, 9, 0, 0, 6] },
         { name: "Salmon Meat", bonuses: [0, 5, 0, 12, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 30,
      items: [
         { name: "Sandstone Ingot", bonuses: [0, 0, 0, 6, 0, 14, 0, 0] },
         { name: "Sandstone Gem", bonuses: [6, 0, 0, 3, 0, 0, 0, 11] },
         { name: "Acacia Planks", bonuses: [3, 11, 0, 0, 0, 6, 0, 0] },
         { name: "Acacia Paper", bonuses: [0, 0, 14, 0, 0, 0, 6, 0] },
         { name: "Malt String", bonuses: [0, 3, 0, 0, 6, 0, 11, 0] },
         { name: "Malt Grains", bonuses: [14, 0, 6, 0, 0, 0, 0, 0] },
         { name: "Carp Oil", bonuses: [0, 0, 3, 0, 11, 0, 0, 6] },
         { name: "Carp Meat", bonuses: [0, 6, 0, 14, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 40,
      items: [
         { name: "Iron Ingot", bonuses: [0, 0, 0, 6, 0, 16, 0, 0] },
         { name: "Iron Gem", bonuses: [7, 0, 0, 3, 0, 0, 0, 12] },
         { name: "Spruce Planks", bonuses: [3, 12, 0, 0, 0, 7, 0, 0] },
         { name: "Spruce Paper", bonuses: [0, 0, 16, 0, 0, 0, 6, 0] },
         { name: "Hops String", bonuses: [0, 3, 0, 0, 7, 0, 12, 0] },
         { name: "Hops Grains", bonuses: [16, 0, 6, 0, 0, 0, 0, 0] },
         { name: "Icefish Oil", bonuses: [0, 0, 3, 0, 12, 0, 0, 7] },
         { name: "Icefish Meat", bonuses: [0, 6, 0, 16, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 50,
      items: [
         { name: "Silver Ingot", bonuses: [0, 0, 0, 7, 0, 18, 0, 0] },
         { name: "Silver Gem", bonuses: [8, 0, 0, 4, 0, 0, 0, 14] },
         { name: "Jungle Planks", bonuses: [4, 14, 0, 0, 0, 8, 0, 0] },
         { name: "Jungle Paper", bonuses: [0, 0, 18, 0, 0, 0, 7, 0] },
         { name: "Rye String", bonuses: [0, 4, 0, 0, 8, 0, 14, 0] },
         { name: "Rye Grains", bonuses: [18, 0, 7, 0, 0, 0, 0, 0] },
         { name: "Piranha Oil", bonuses: [0, 0, 4, 0, 14, 0, 0, 8] },
         { name: "Piranha Meat", bonuses: [0, 7, 0, 18, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 60,
      items: [
         { name: "Cobalt Ingot", bonuses: [0, 0, 0, 8, 0, 20, 0, 0] },
         { name: "Cobalt Gem", bonuses: [9, 0, 0, 4, 0, 0, 0, 15] },
         { name: "Dark Planks", bonuses: [4, 15, 0, 0, 0, 9, 0, 0] },
         { name: "Dark Paper", bonuses: [0, 0, 20, 0, 0, 0, 8, 0] },
         { name: "Millet String", bonuses: [0, 4, 0, 0, 9, 0, 15, 0] },
         { name: "Millet Grains", bonuses: [20, 0, 8, 0, 0, 0, 0, 0] },
         { name: "Koi Oil", bonuses: [0, 0, 4, 0, 15, 0, 0, 9] },
         { name: "Koi Meat", bonuses: [0, 8, 0, 20, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 70,
      items: [
         { name: "Kanderstone Ingot", bonuses: [0, 0, 0, 8, 0, 22, 0, 0] },
         { name: "Kanderstone Gem", bonuses: [10, 0, 0, 4, 0, 0, 0, 17] },
         { name: "Light Planks", bonuses: [4, 17, 0, 0, 0, 10, 0, 0] },
         { name: "Light Paper", bonuses: [0, 0, 22, 0, 0, 0, 8, 0] },
         { name: "Decay String", bonuses: [0, 4, 0, 0, 10, 0, 17, 0] },
         { name: "Decay Grains", bonuses: [22, 0, 8, 0, 0, 0, 0, 0] },
         { name: "Gylia Oil", bonuses: [0, 0, 4, 0, 17, 0, 0, 10] },
         { name: "Gylia Meat", bonuses: [0, 8, 0, 22, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 80,
      items: [
         { name: "Diamond Ingot", bonuses: [0, 0, 0, 9, 0, 24, 0, 0] },
         { name: "Diamond Gem", bonuses: [10, 0, 0, 4, 0, 0, 0, 18] },
         { name: "Pine Planks", bonuses: [4, 18, 0, 0, 0, 10, 0, 0] },
         { name: "Pine Paper", bonuses: [0, 0, 24, 0, 0, 0, 9, 0] },
         { name: "Rice String", bonuses: [0, 4, 0, 0, 10, 0, 18, 0] },
         { name: "Rice Grains", bonuses: [24, 0, 9, 0, 0, 0, 0, 0] },
         { name: "Bass Oil", bonuses: [0, 0, 4, 0, 18, 0, 0, 10] },
         { name: "Bass Meat", bonuses: [0, 9, 0, 24, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 90,
      items: [
         { name: "Molten Ingot", bonuses: [0, 0, 0, 9, 0, 26, 0, 0] },
         { name: "Molten Gem", bonuses: [11, 0, 0, 5, 0, 0, 0, 20] },
         { name: "Avo Planks", bonuses: [5, 20, 0, 0, 0, 11, 0, 0] },
         { name: "Avo Paper", bonuses: [0, 0, 26, 0, 0, 0, 9, 0] },
         { name: "Sorghum String", bonuses: [0, 5, 0, 0, 11, 0, 20, 0] },
         { name: "Sorghum Grains", bonuses: [26, 0, 9, 0, 0, 0, 0, 0] },
         { name: "Molten Oil", bonuses: [0, 0, 5, 0, 20, 0, 0, 11] },
         { name: "Molten Meat", bonuses: [0, 9, 0, 26, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 100,
      items: [
         { name: "Voidstone Ingot", bonuses: [0, 0, 0, 10, 0, 28, 0, 0] },
         { name: "Voidstone Gem", bonuses: [12, 0, 0, 5, 0, 0, 0, 21] },
         { name: "Sky Planks", bonuses: [5, 21, 0, 0, 0, 12, 0, 0] },
         { name: "Sky Paper", bonuses: [0, 0, 28, 0, 0, 0, 10, 0] },
         { name: "Hemp String", bonuses: [0, 5, 0, 0, 12, 0, 21, 0] },
         { name: "Hemp Grains", bonuses: [28, 0, 10, 0, 0, 0, 0, 0] },
         { name: "Starfish Oil", bonuses: [0, 0, 5, 0, 21, 0, 0, 12] },
         { name: "Starfish Meat", bonuses: [0, 10, 0, 28, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 105,
      items: [
         { name: "Dernic Ingot", bonuses: [0, 0, 0, 10, 0, 29, 0, 0] },
         { name: "Dernic Gem", bonuses: [12, 0, 0, 5, 0, 0, 0, 22] },
         { name: "Dernic Planks", bonuses: [5, 22, 0, 0, 0, 12, 0, 0] },
         { name: "Dernic Paper", bonuses: [0, 0, 29, 0, 0, 0, 10, 0] },
         { name: "Dernic String", bonuses: [0, 5, 0, 0, 12, 0, 22, 0] },
         { name: "Dernic Grains", bonuses: [29, 0, 10, 0, 0, 0, 0, 0] },
         { name: "Dernic Oil", bonuses: [0, 0, 5, 0, 22, 0, 0, 12] },
         { name: "Dernic Meat", bonuses: [0, 10, 0, 29, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 110,
      items: [
         { name: "Titanium Ingot", bonuses: [0, 0, 0, 11, 0, 30, 0, 0] },
         { name: "Titanium Gem", bonuses: [13, 0, 0, 5, 0, 0, 0, 23] },
         { name: "Maple Planks", bonuses: [5, 23, 0, 0, 0, 13, 0, 0] },
         { name: "Maple Paper", bonuses: [0, 0, 30, 0, 0, 0, 11, 0] },
         { name: "Jute String", bonuses: [0, 5, 0, 0, 13, 0, 23, 0] },
         { name: "Jute Grains", bonuses: [30, 0, 11, 0, 0, 0, 0, 0] },
         { name: "Sturgeon Oil", bonuses: [0, 0, 5, 0, 23, 0, 0, 13] },
         { name: "Sturgeon Meat", bonuses: [0, 11, 0, 30, 0, 0, 0, 0] },
      ],
   },
   {
      minLevel: 115,
      items: [
         { name: "Cinnabar Ingot", bonuses: [0, 0, 0, 11, 0, 31, 0, 0] },
         { name: "Cinnabar Gem", bonuses: [13, 0, 0, 5, 0, 0, 0, 23] },
         { name: "Redwood Planks", bonuses: [5, 23, 0, 0, 0, 13, 0, 0] },
         { name: "Redwood Paper", bonuses: [0, 0, 31, 0, 0, 0, 11, 0] },
         { name: "Heather String", bonuses: [0, 5, 0, 0, 13, 0, 23, 0] },
         { name: "Heather Grains", bonuses: [31, 0, 11, 0, 0, 0, 0, 0] },
         { name: "Mahseer Oil", bonuses: [0, 0, 5, 0, 23, 0, 0, 13] },
         { name: "Mahseer Meat", bonuses: [0, 11, 0, 31, 0, 0, 0, 0] },
      ],
   },
];
