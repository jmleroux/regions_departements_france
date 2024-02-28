.PHONY: generate
generate:
	docker compose run --rm deno deno run --allow-read --allow-write app.ts
	docker compose run --rm deno chown 1000:1000 dist/*.json
