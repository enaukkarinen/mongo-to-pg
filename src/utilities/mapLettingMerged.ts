export function mapLettingMerged(document: any) {
  const { coordinates } = document.property.geocode;
  return {
    ID: document._id,
    MEMBERS: document.members,
    GEOCODE: `ST_GeomFromText('POINT(${coordinates[0]} ${coordinates[1]})')`,
  };
}
