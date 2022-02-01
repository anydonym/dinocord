@echo off
echo Running linter...
deno lint --config ./denocfg.json
echo Ran deno lint.
echo Formatting...
deno fmt --config ./denocfg.json
echo Ran deno fmt.
@echo on