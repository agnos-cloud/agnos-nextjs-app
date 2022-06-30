git-commit-msg:
	echo "npx commitlint --edit"

git-pre-commit:
	npx lint-staged
#	npm run prettier-format
# we have to npm run lint here because "next lint" can't work against only staged files
	npm run lint