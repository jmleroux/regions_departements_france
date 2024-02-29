# Régions et départements de France

J'utilise ces fichiers chaque fois que j'ai besoin d'intialiser une base régionale ou juste lorsque j'ai besoin de référentiels.

Fichier générés à partir des CSV de l'INSEE : https://www.insee.fr/fr/information/6051727

Les CSV de référence sont situés dans le dossier [`resources`](./resources).

Les fichiers JSON générés sont situés dans le dossier [`dist`](./dist).

### Regénérer les fichiers référentiels JSON

L'application peut être utilisé from scratch en utisant `docker compose`.
J'ai wrappé la commande dans une target make pour plus de simplicité.

```bash
make generate
```
