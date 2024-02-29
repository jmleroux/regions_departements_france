import { CsvFile } from "https://deno.land/x/csv_file@v0.0.4/mod.ts"

type Departement = {
  code: string,
  name: string,
  region: string
}

type Region = {
  code: string,
  name: string,
  departements: Array<Departement>
}

type Regions = Record<string, Region>

async function writeJson(filePath: string, data: any) {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.log(e);
  }
}

const csvRegions = new CsvFile(await Deno.open('./resources/region_2022.csv', { read: true }))

let regions: Regions = {}

await csvRegions.readHeader();
for await (const record of csvRegions.maps()) {
  const region: Region = {
    code: record.get('REG'),
    name: record.get('LIBELLE'),
    departements: []
  }
  regions[region.code] = region
}

csvRegions.close()

const csvDepartements = new CsvFile(await Deno.open('./resources/departement_2022.csv', { read: true }))

await csvDepartements.readHeader();
for await (const record of csvDepartements.maps()) {
  const departement: Departement = {
    code: record.get('DEP'),
    name: record.get('LIBELLE'),
    region: record.get('REG')
  }
  regions[departement.region].departements.push(departement)
}

csvDepartements.close()

writeJson('./dist/regions_departements_2022.json', regions)
console.info('Fichier regions_departements généré')

const shortRegions = {}
Object.keys(regions).forEach(code => {
  shortRegions[code] = regions[code].name
})

writeJson('./dist/regions_2022.json', shortRegions)
console.info('Fichier regions généré')
