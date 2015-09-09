(function() {
    'use strict';

    angular
        .module('gallery')
        .controller('FilerController', FilerController);

    FilerController.$inject = ['FilerFactory', '$log', '$filter', '$document'];

    function FilerController(FilerFactory, $log, $filter, $document) {
        // vm for ViewModel
        var vm = this;
        vm.logger = $log;
        vm.filesPerDepth = null;
        vm.currentFolderFiles = [];
        vm.show = false;

        vm.setVisibleFolder = function(folder) {
            vm.show = (folder === undefined ? false : folder.name);
            vm.currentFolderFiles = vm.getFolderFiles(folder);
        };

        FilerFactory
            .getFiles()
            .then(function(response) {
                vm.filesPerDepth = response.data;
                vm.currentFolderFiles = vm.getFolderFiles(undefined);
            }, function(error) {
                console.log(error);
            });

        vm.byFolder = function(item) {
            if (item.items) {
                return item;
            }
        };

        vm.byFile = function(item) {
            if (item.items == undefined) {
                return item;
            }
        };

        vm.getFolderFiles = function (folder) {
            // root folder
            if (folder === undefined) {
                var tmpArray = [];
                vm.filesPerDepth.forEach(function(item) {
                    if (undefined != vm.byFile(item)) {
                        tmpArray.push(item);
                    }
                });
                vm.currentFolderFiles = vm.formatFilesForBlueimp({items: tmpArray});
            } else {
                vm.filesPerDepth.some(function (item) {
                    if (item.hasOwnProperty('items') && item.name === folder.name) {
                        vm.currentFolderFiles = vm.formatFilesForBlueimp(folder);
                        return true;
                    }
                });
            }

            return vm.currentFolderFiles;
        };

        vm.formatFilesForBlueimp = function (folder) {
            var tmpArray = [];

            folder.items.forEach(function(item) {
                tmpArray.push({
                    href: '/data' + (folder.name ? '/' + folder.name : '') + '/' + item.name,
                    title: folder.name
                });
            });

            return tmpArray;
        }

        vm.displayGallery = function ($event, folder) {
            $event = $event || window.event;
            var target = $event.target || $event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {
                    index: link,
                    event: $event,
                    container: '#blueimp-gallery-carousel',
                    carousel: true,
                    enableKeyboardNavigation: true
                },
                links = vm.currentFolderFiles;
            if (folder === 'rootFolder' && vm.currentFolderFiles.length === 0) {
                links = vm.getFolderFiles(undefined);
            }

            blueimp.Gallery(links, options);
        };
    }
})();
