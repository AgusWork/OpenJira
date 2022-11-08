interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData = {
  entries: [
    {
      description: "Id amet tempor magna dolore",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "Ipsum aliquip minim proident sit occaecat commodo officia anim veniam velit ullamco.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Nostrud voluptate magna ut excepteur nostrud incididunt qui nulla sit cillum.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
