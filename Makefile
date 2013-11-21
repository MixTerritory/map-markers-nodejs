#Markers
test-markers:
	@echo "test-markers:"
	@node test/fixture/clear.js
	@./node_modules/.bin/mongofixtures markersdb test/fixture/markers.js
	@./node_modules/.bin/mocha test/markerstest.js
