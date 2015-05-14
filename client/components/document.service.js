'use strict';

angular
	.module('playgroundApp')
	.factory(
		'DocumentService',
		function ($resource) {
			return $resource(
				'/api/documents/:id',
				{
					id: '@_id'
				}
			);
		}
	);
