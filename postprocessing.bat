@echo off
echo Running linter...
deno lint --config ./deno.json
echo Ran deno lint.
echo Formatting...
deno fmt --config ./deno.json
echo Ran deno fmt.
@echo on
