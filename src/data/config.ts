export const config = {
  phoneUSNational: "6692868649",
  phoneUSE164: "+16692868649",
  phoneFormatted: "(669) 286-8649",
  yearsOfExperience: 6,
  vehiclesDetailed: 10000,
  bayAreaLocations: 1000,
};

export const formattedNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
