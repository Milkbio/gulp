const del = require('delete');

function clean(cb) {
	del(['../output/'], {force: true}, cb);
}
exports = clean