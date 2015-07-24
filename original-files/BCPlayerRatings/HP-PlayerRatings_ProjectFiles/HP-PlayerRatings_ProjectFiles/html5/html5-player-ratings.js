(function() {
    //global variables
    var _mediaAPIToken = "my6hUiO79xyZCTZ9iR6pGtTxucFdOV9ay4Ip2hnJ5c2wm20pvN4xAw..";
    var _bvHostName = "apitestcustomer.ugc.bazaarvoice.com/bvstaging";
    var _bvPassKey = "stq9t01nsnvlk2drx5b7q5zzm";
    var _parentURL = window.location.href;
    var _bvAPIVersion = "5.4";
    var _videoID,
        _referenceID,
        _bvVideoID,
        _bvUserRating,
        _bvUserName;
        
    var guidCookie;
    var _uniqueID;
    var videoTag;
        
    // Button Images
    var THUMBS_UP_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAkCAYAAAAkcgIJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExQTc0OUM0NTg4RUZEQjlENSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2REE4OEZGRDc2NzQxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2REE4OEZGQzc2NzQxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+a4LF9AAAAsZJREFUeNrsmE9IFFEcx7+zOzuzf9Rdd1NMTaM/ZGFZFymhPwcpqLB/Qp48FFEgFpGHOnQob93qkOHFQ0EXT1FJp6yINaPsEoQZmNkfNF13dnf2/0y/N7GWEFLbFvMGf/BbZt/AzPu873u/930jKIoyB8ALPiNC2Ud5njJuA99RTHmacoiyiHeYXGxi6lgFhsVRK8GUWQkGSzC/ipQGXHmjouHBLJoHQ3g8neYX5v7nJG6Ox3FxgwfbyySceK7g7qfkf4URC/WgD2oWXocNrStktEJGhdOGjhcRRDM62mqcfCnTUiUjqem4Oqoa/0+udqF7YxG6XkXR+y7OlzK1bjsu1XsMNTb7ROwsl9C+0okSh4AzLyNQSKGudW5+qtne5TJOrXHjHKkxqWpG20FSrK+xBD1jKrpfx/4pjPA3RnM6qSGc1iHkRoYu2PWxYQV+2WZAFIvf7wZn0mgfUnCA4DrWumCn5hpSs4ARzhvm2lsVN8bicFOvtJ/aWSdZmY5mNNza6sW2gGP+3kgog06acjGack7iCDb7zQFTNzCDy7RGtvgc1Hl9odwEJNJPrdsG2S4sfCMpOR7LgoRDXYlYUJi8n8b62BSQUO3+s2XnpYLQ4BPNVQAa/Q7sfhRCWzCMLwmNbzvD1gKbXLuoBLPRNkPkrfez2TT2sVJMmyP3RnNPhYTBqRTOjkRw52OSb5hDVU6Uk//qn0zia0rje5q9J2PJzOXADh/qvSLfygQkG5bRZnF7IoGHNN2YG+AWplQScGG9hzxX3DCXo5Esv9Ms583YLt7f5EWl6/fHJZHVQUZg3reZAoadX1jHIuS1pmjjzOqLOFrhhz+7Tg6auenjq1zmgTlS7cQTOusffjqHUjpl6ovZc+M7gQ6ViFsqZWOzNdURwGQRXvrUZGaYrJVgJqwE02slmB7Ke1YqAPspOymHeV5D3wQYAI0P8GntKSBWAAAAAElFTkSuQmCC";
    var THUMBS_DOWN_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAkCAYAAAAkcgIJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkRBODhGRjg3Njc0MTFFMkJEOUJCQzM1Qjg5ODFFQTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkRBODhGRjk3Njc0MTFFMkJEOUJCQzM1Qjg5ODFFQTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2REE4OEZGNjc2NzQxMUUyQkQ5QkJDMzVCODk4MUVBNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2REE4OEZGNzc2NzQxMUUyQkQ5QkJDMzVCODk4MUVBNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi53tQMAAALWSURBVHja7JhLaBNhEMf/m9cmMQ8bTaS1tmI1CoooolUEq5BLpehFUC8iioJKbA8eRPABgiJ49Q1WinjyhVBBD1IEtRSxKFaLKLZqUWtjkk3z2s3uOl9KQhqhFFLs7uLAJGGzCfv7Zr6Z/3ycIAgxAF7o0xLk7eRHydMm6Nvc5IfJu8ldeocp2HIWHaPAMNtuJBi/kWBgKBhLpX8Ql1S09SbQ81tCldUEdYJ7OXJRUZGSVWyp4bF3gQMNLrN2YO58y+B1LIe762cSDAd5AhqOG3vvjeZw8WMKXcMiwTi0A8ObONjNHNwWDgH75LK2udqGTQErJFVje8bPm9Av5BDqiuLZiDTp3xUWQDN7JiqqOPs+iQMLHQjNsSHoNuu3AEREBSNZBTvr7FjmtWC6raI0q3eaMY+8+WkM1z+n9Q1zbyiD4YyCbbU8Ztumv2VVlBuPfojYGLDh/AqX/hVAo8+Kzu9ZXP6URlpW9Q3zIiLluzprfnFJ1XeaMQnzuKkKtU5tSLyKYFhmPY+IWClb85qrXLpY6KWeQHkz95eeG0jKpB6AJR6LNmAOUrM89TYJJz2sUnKdPTu1IIzmFNxc68W6Wdbid0yXhV8lkMyppAIoVUO+KYPhKj3Q+EVNk610Ye1JquU/7+kR4KOlb1/jKcoWtsd2dQvYOpfHoUWOPHSdc8pUQ7ziGDNt5ufHXzvXn4JAgB2N7iLIk58i9r0UsHu+A8eXztDmPFNuD1mpJnl/gyJSKAz3h7JopdQKB504stip3eGs1AZTMk7SHmqjh26iZsqsYyCDY29GcYKisb/Bod1qVm4PKAJsvmkNjq3+FWqmZ94l8wphB4lRzY/NpcZEZ1xScPtrFn0049wazODCKjdaanh9nAGU2uZqHh8SMk5TNPw8h2urPdjgt/6zpsnp/Kx5XGn+f26mZRjZSDBfjARz1Ugwl8g7jVQAWsjDbN7S8x76I8AA8NbmKUoXXLsAAAAASUVORK5CYII=";
    var THUMBS_UP_IMG_ON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAkCAYAAAAkcgIJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExQTc0OUM0NTg4RUZEQjlENSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDQwMEI0QTc2OUUxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDQwMEI0OTc2OUUxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA0ODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+idqfmQAAAvhJREFUeNrsmOtLU3EYx7/n7Gy6rc1pXqeW3cARGYW9KO2ioEgW2IWC6EVBbySiCxTiC/8CgyIwCsLohZXRRTACKwKtRO0qWUjmranDy3Sb7uJ2dnrOwsiKwDnlnIPf8fA757dxOJ89v+f5fc9hUPV5AkAM5CkXRTVFmVBq8TAyh5lRO0UOC2UoS8yOUmBEHVYSTIKSYLAE8y9pWAYV2fHoPboWLQcykJ+qly9MySoDTlhMKG8ZxosBN2oKzNhHc4spLlIXWmlQY8IXRM1XZygGpwK4mW+G4aUNtzodiwKjQvHJMhqj53uhIXcAxzNN0HEsXtk8aBn2YMzH40puMlx+Aa10vsDyRQxGzEr/ZACVWxPxdsSLbqcf72jscvhxKScJHNVU45BbHjCiOiemEa1iUL45HnU9k3BMB9Ex7sP7US8qtyXBpFHh+cDUgsHMy5slajnERrEICj/PxVGgT21hGka9PA41WOEkIFHbU3R4UJSGe9+cuPjBDl4Q0OvyRxLGETbMhU3LcXpDHNyBIFiG+TUfIKIoyo5Bw6LkiRVNvy2tLYla3NiVgmVqFh4+iPV3uiMKE3Y3O5sVh/PNw3hDha1RMbO+E0JQQI9zetZ8G/12R10fVhvV8PGCdFqzeC+Ng24qev8cGwVPjYGX1qb52uZG8/4M1O9Oh1nPQQoKG6ZpyAOxVJ5ap0JtWQoK+y/NSdbiUY8Ll9vt8jea9X2TKEjT49rOFBxcY5Q3zN0uJ2xkYY6sMyIhWiXvZSa2V9Fc5j7sw8cxr7wzM+LhQ3EsMwaF6fqQG5AtjJ32i4q2EZyhzbM6zwxLrEa+y2zGm3XYfSh6/B3WOWyeWo6Bmlz0jG+TBIzokLX0/GIkr5Ws4/CHq/nL4ojKTtDi3MY41JLhrPo0Lh2Y29TR8lJ1aNi7AnZyycz/YIhG9HB6ysr9bheeWSP/KKCU17Mh17z0qknKMLySYPqVBHNdKTCMQD2Tufqlno6LFdHNhFLLHhpOUbTKuYZ+CDAAwBsaVQejZQAAAAAASUVORK5CYII=";
    var THUMBS_DOWN_IMG_ON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAkCAYAAAAkcgIJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExQTc0OUM0NTg4RUZEQjlENSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDQwMEI1Mjc2OUUxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDQwMEI1MTc2OUUxMUUyQkQ5QkJDMzVCODk4MUVBNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2ODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTFBNzQ5QzQ1ODhFRkRCOUQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+8qyi/QAAAuJJREFUeNrsWF1IU2EYfs7ZX5u6udXWVgvTCjTJLtJKw+wiLUjIpJK88qaLCf3QVXUTVEQmYRAYGVF0IVFkUYGR4UXWxaLIDNOKZg21pW3ObXrm/k7vGTaWUAhBnHPoOXx8YztnnOec732e5/0YtL7zAzBAmgjSuEbjKO8o4BiJk/mJPhqbWMgDRcLbkQsZAXVyImOWExnIiozyb/8gW6NAW4UVZVYdfOE4GOb35/I8oFYwyFAyuOMKorV/Ah/8EfGQ2bdSj3VmLaoeuOGbiUPxJzKzczGdf2StCVvtGeIiE47z4GIJBKIJeKZj87rm/lQQXcMhqFhGXDUzxsVQaNLAWbscFUt0876Oi/EIRBLiqRkT1cvJEjMu9PnQ6Q5hYCIiXQEwaxXJcX1wEm+8YWlLsysQxZdgFM925cBRaJQ2mTpSMqtOifaPAYyTLEvaZ6pzMkmVptD41CP9BPDcw6EmNwuHikzQKVlpkym3aZOuXknml61hpb3MhAhT2vEZ7lBU+tlMiC6byShfjnHJzDU3ulAwwFAgkkwJc/Ncnl6FGfq+3zcjDjItZJZNGy2Yprtm0xJmLMFDQ+Sy1CxqOofR83U69VuJRYurW2zIVLHg4gkU3nSJg8y5196kYRqpXhKzD1+YeTpuVdkxSCEy3UzLbTp0bLfj9qcAzvf6EOd5cbUAQjajVfYLThQvgoHeSu2j4VT+2rYsA+2VS3G534/jzjFx9jNzsZOk+jBJ9Z7HIylh2LtCjyu0tJp7vTj96rt4m7N05FJRN5dacJaW3xMyUwH7V2ejpWwxjjnHcfGtT9ydZjp25+kRpmjfRGQEHFxjwqn1ZjT2eHDj/aT42+Z0CKFTMM/6VXoULVyAhnwDGrpHcXcoKI09gHTco5vON6pxZoMF30gY6rtG0T0y9c9MUy7bswIm/++biZlMXE5k3HIi0yYXMgxPYY+5NPCQPu+QhZrxjoJqmg7QeCHlGvohwACIBwSm0ml8SQAAAABJRU5ErkJggg==";
    
    // embed jquery to iframe DOM
    var script = document.createElement('script');
    script.type= "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    
    // retrieve bvHostName
    if(_parentURL.indexOf('bvHostname=') !== -1){
        debug("***host name is in the URL!***");
        
        var bvHostIndex = _parentURL.indexOf('bvHostname=');
        _bvHostName = _parentURL.substring(bvHostIndex+11);
        
        debug("***host name is :" + _bvHostName);
        
        // substring until next query arg if it is not the last in URL
        if(_bvHostName.indexOf('&') !== -1){
            var bvHostEndIndex = _bvHostName.indexOf('&');
            _bvHostName = _bvHostName.substring(0, bvHostEndIndex);
        }
        debug("Final Host: " + _bvHostName);
    }
    
    // retrieve bvPassKey
    if(_parentURL.indexOf('bvPassKey=') !== -1){
        debug("***Pass Key is in the URL!***");
        
        var bvPassIndex = _parentURL.indexOf('bvPassKey=');
        _bvPassKey = _parentURL.substring(bvPassIndex+10);
        
        debug("***Pass Key is :" + _bvPassKey);
        
        // substring until next query arg if it is not the last in URL
        if(_bvPassKey.indexOf('&') !== -1){
            var bvPassEndIndex = _bvPassKey.indexOf('&');
            _bvPassKey = _bvPassKey.substring(0, bvPassEndIndex);
        }
        debug("Final Host: " + _bvPassKey);
    }
    
    var player,
        videoPlayerModule,
        experienceModule;
        
    player = brightcove.api.getExperience();
    videoPlayerModule = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    experienceModule = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    
    if(experienceModule.getReady())
    {
        initialize();
    }
    else
    {
        experienceModule.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, initialize);
    }
    
    //listening for events
    function initialize(evt) {
        debug("***INITIALIZE API***");
        
        // --------- APPEND TAG THAT HOLDS CUSTOM ELEMENTS        
        videoTag = document.getElementById('bcVideo');
        var offsets = getOffsets(videoTag);
        var playerHeight = window.innerHeight;
        var playerWidth = window.innerWidth;
        debug("Player Width: " + playerWidth);
        var videoParent = $(videoTag).parent();
        
        $(document.body).append('<div id="custom-elements"></div>');
        $('#custom-elements').css({'position':'absolute','top':(playerHeight - (40 + offsets[1] + 6))+'px','left':offsets[0]+'px','z-index':'6','right':offsets[0]+'px'});
        // ---------
        
        displayUIButtons();
        
        //construct URL
        videoPlayerModule.getCurrentVideo(constructURLs);
        
        // add Media Events
        videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaChange);
    }
    
    function constructURLs(result) {
        _videoID = result.id;
        _referenceID = result.referenceID;
        
        _bvVideoID = result.referenceID ? "bcvid-" + _referenceID : "bcvid-" + _videoID;
        
        debug("This is the BV Video ID: " + _bvVideoID);
        
        // construct URLS for API
        debug(constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID));
        debug(constructRatingDetails(_bvHostName, _bvPassKey, _videoID));
        
        // get existing cookies on Player Load
        debug("Player Load First Video ID: " + _bvVideoID);
        
        // check first video for cookies
        checkVideoForCookies(_bvVideoID);
        
        
        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }
    
    /**--------------------------------------------------------- URL REQUEST FUNCTIONS **/
    
    $(document).ready(function() {
        debug("Jquery is loaded");
        debug(uniqueid());
    });
    
    /**--------------------------------------------------------- EVENT HANDLERS **/
    
    function onMediaChange() {
        resetButtonIcons();
        videoPlayerModule.getCurrentVideo(changeVidCallback);
    }
    
    function changeVidCallback(result) {
        _videoID = result.id;
        _referenceID = result.referenceID;
        debug(result);
        
        _bvVideoID = result.referenceID ? "bcvid-" + _referenceID : "bcvid-" + _videoID;
        
        debug("This is the BV Video ID: " + _bvVideoID);
        
        debug("Media Change: " + _bvVideoID);
        checkVideoForCookies();
        
        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }
    
    function onThumbsUpClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if(!_uniqueID){
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0,23);
            
            debug("Unique ID: " + _uniqueID);
        }
        
        if(!guidCookie){
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",5");
            enableThumbsUpIcon();
            
            // submit rating
            submitRating('5');
            disableButtons();
        }else{
            debug("You already have a GUID: " + guidCookie);
        }
    }
    
    function onThumbsDownClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if(!_uniqueID){
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0,23);
        }
        
        if(!guidCookie){
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",1");
            enableThumbsDownIcon();
            
            // submit rating
            submitRating('1');
            disableButtons();
        }else{
            debug("You already have a GUID: " + guidCookie);
        }
    }
    
    function submitRating(rating){
        $.post( constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID, rating) + "&callback=?",
          function(json) {
            debug(json);
        });
    }
    
    function enableThumbsUpIcon() {
        debug($('#thumbs-up'));
        $('#thumbs-up').children('img').attr('src',THUMBS_UP_IMG_ON);
    }
    
    function enableThumbsDownIcon() {
        debug($('#thumbs-down'));
        $('#thumbs-down').children('img').attr('src',THUMBS_DOWN_IMG_ON);
    }
    
    function disableButtons() {
        $('#thumbs-up').unbind("mousedown");
        $('#thumbs-down').unbind("mousedown");
        $('#thumbs-up, #thumbs-down').css({'cursor':'auto'});
    }
    
    function resetButtonIcons() {
        $('#thumbs-up').children('img').attr('src',THUMBS_UP_IMG);
        $('#thumbs-down').children('img').attr('src',THUMBS_DOWN_IMG);
        $('#thumbs-up, #thumbs-down').css({'cursor':'pointer'});
    }
    
    /**--------------------------------------------------------- UI ELEMENTS **/
    
    function displayUIButtons() {
        $('#custom-elements').append('<div class="ratings"><div id="thumbs-up"><img src="' + THUMBS_UP_IMG + '" /></div><div id="thumbs-down"><img src="' + THUMBS_DOWN_IMG + '" /></div></div>');
        $('.ratings').css('width','125px');
        $('#thumbs-up, #thumbs-down').css({'float':'left','position':'relative','z-index':'5','margin-right':'10px','cursor':'pointer'});
        debug("display UI Buttons");
    }
    
    function drawBarGraph(likes, dislikes) {
        // remove any existing bar graph data
        $('#video-ratings').remove();
        
        // convert amount of likes to percent
        var totalVotes = likes + dislikes;
        var likesPercent = totalVotes ? likes / totalVotes : 0;
        
        debug("Percentage of Likes: " + likesPercent + "%");
        
        // to get width, multiply width of bar against percent
        var likeBarWidth = 178 * likesPercent;
        
        $('#custom-elements').append('<div id="video-ratings" style="position:relative;float:left;width:178px;top:0;"><canvas id="barGraphBG" width="178" height="8" style="position:absolute;top:0;left:0;"></canvas></div>');
        
        var canvasBG = document.getElementById('barGraphBG');
        var contextBG = canvasBG.getContext('2d');
  
        contextBG.beginPath();
        contextBG.rect(0, 0, 178, 8);
        contextBG.fillStyle = "#B9B8BB";
        contextBG.fill();
        
        $('#video-ratings').append('<canvas id="canvasLikes" width="178" height="8" style="position:absolute;top:0px;left:0;"></canvas>');
        
        var likeCanvas = document.getElementById('canvasLikes');
        var likeContext = likeCanvas.getContext('2d');
        var likeWidth = likeBarWidth;
  
        likeContext.beginPath();
        likeContext.rect(0, 0, likeWidth, 8);
        likeContext.fillStyle = "#0096D6";
        likeContext.fill();
        
        // print likes and dislikes
        $('#video-ratings').append('<p id="total-likes"></p>');
        $('#video-ratings').append('<p id="total-dislikes"></p>');
        $('#video-ratings > p').css({'font-family':'Arial','font-size':'10px','font-weight':'bold','position':'absolute','top':'2px',});
        $('#video-ratings > p:last-child').css({'right':'0'});
        
        var totalLikesDiv = document.getElementById('total-likes');
        var totalDislikesDiv = document.getElementById('total-dislikes');
        
        totalLikesDiv.innerHTML = (likes == 1) ? likes + " like" : commaSeparateNumber(likes) + " likes";
        totalDislikesDiv.innerHTML = (dislikes == 1) ? dislikes + " dislike" : commaSeparateNumber(dislikes) + " dislikes";
    }
    
    function displayTotalViews(videoID) {
        // remove any existing views tags
        $('#total-video-views').remove();
        
        // re-add to custom DIV
        $('#custom-elements').append('<div id="total-video-views" style="float:right;font-family:Arial;font-size:16px;font-weight:bold;position:relative;top:8px;"></div>');
        
        // overwrite Media API token if present in override variables
        debug("***** PARENT URL: " + _parentURL);
        if( _parentURL.indexOf('apiToken=') !== -1 ) {
            apiTokenIndex = _parentURL.indexOf('apiToken=');
            _mediaAPIToken = _parentURL.substring(apiTokenIndex+9);
            
            if(_mediaAPIToken.indexOf('&') !== -1){
                apiTokenEndIndex = _mediaAPIToken.indexOf('&');
                _mediaAPIToken = _mediaAPIToken.substring(0, apiTokenEndIndex);
            }
            
            debug("Media API Token was overriden to: " + _mediaAPIToken);
        }
        
        var mediaAPIRequest = "http://api.brightcove.com/services/library?command=find_video_by_id&video_fields=playsTotal&token=" + _mediaAPIToken + "&video_id=" + videoID;
        debug(mediaAPIRequest);
        
        $.getJSON(mediaAPIRequest + "&callback=?", function(data) {
            var items = [];
            
            var playsTotal = data.playsTotal ? data.playsTotal : "0";
            playsTotal = commaSeparateNumber(playsTotal);
            
            playsTotal += " views";
        
            $('#total-video-views').text(playsTotal);
        });
        
    }
    
    /**--------------------------------------------------------- SET/GET COOKIES **/
    function setCookie(c_name,value,exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value;
    }
    
    function getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(';');
        for (i=0;i<ARRcookies.length;i++){
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
            x=x.replace(/^\s+|\s+$/g,'');
            debug(x);
            if (x==c_name) {
                return unescape(y);
            }
        }
    }
    
    function checkVideoForCookies(_bvVideoId) {
        guidCookie = getCookie(_bvVideoID);
        
        debug(guidCookie);
        
        if(guidCookie){
            debug("(Check Video For Cookies) This Video already has a GUID cookie: " + guidCookie);
            
            var cookieArray = guidCookie.split(",");
            
            // set the uniqueID to the existing one in the cookie:
            _uniqueID = cookieArray[0];
            debug("Existing User ID Found: " + _uniqueID);
            _bvUserName = _uniqueID.substr(0,23);
            
            if(cookieArray.indexOf(_bvVideoID) !== -1){
                if(cookieArray[2] == "5"){
                    $('#thumbs-up').ready(function(){
                        debug("Thumbs Up is ready.");
                    });
                    enableThumbsUpIcon();
                }else if(cookieArray[2] == "1"){
                    $('#thumbs-down').ready(function(){
                        debug("Thumbs Down is ready.");
                        enableThumbsDownIcon();
                    });
                }
            }
            
            //unbind click events and remove cursor css
            disableButtons();
            
        }else{
            debug("This Video doesn't have any existing cookies on this browser, attach click events");
            // attach click handlers
            $('#thumbs-up').bind("mousedown",onThumbsUpClick);
            $('#thumbs-down').bind("mousedown",onThumbsDownClick);
        }
    }
    
    function getCurrentVideoRatings(currentBVVideoID) {
        var likes = 0;
        var dislikes = 0;
        
        debug( constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) );
        // --------- KEEP IN SEPARATE FUNCTION??? (getCurrentVideoRatings?)
        $.ajaxSetup({ cache: true });
        $.getJSON( constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) + "&callback=?",
          function(json) {
              debug("Troubleshoot Ratings Response from BazaarVoice: ");
              jQuery.each(json.Includes.Products[_bvVideoID].ReviewStatistics.RatingDistribution, function(index, result) {
                    debug( result );
                    if( result.RatingValue == "1" ) {
                        dislikes = result.Count;
                    }else if( result.RatingValue == "5" ) {
                        likes = result.Count;
                    }
              });
              debug( "Total Likes: " + likes );
              debug( "Total Dislikes: " + dislikes );
              
              drawBarGraph(likes, dislikes);
        });
        // ---------
    }
    
    /**--------------------------------------------------------- URL CONSTRUCT FUNCTIONS **/
    function constructSubmitRating(bvHost, bvPassKey, videoID, userRating) {
        var bvSubmitRatingURL = "http://" + bvHost + "/data/submitreview.json?apiversion=" + 
                _bvAPIVersion + "&passkey=" + bvPassKey + "&productId=" + videoID +
                "&action=submit&rating=" + userRating +
                "&UserLocation=Home&UserEmail=" + _bvUserName + "@useremail.com" + "&UserNickname=" + _bvUserName +
                "&ReviewText=testtesttesttesttesttestesttest%20testtesttesttesttesttestesttest%20testtesttesttesttesttestesttest" +
                "&title=Default%20review%20title&UserId=" + _bvUserName + "&callback=callback";
        
        return bvSubmitRatingURL;
    }
    
    /*function constructRetrieveRating(bvHost, bvPassKey, videoID) {
            var bvRetrieveRatingURL = "http://" + bvHost + "/data/reviews.json?apiversion=" + 
                    _bvAPIVersion + "&passkey=" + bvPassKey + "&filter=id:" + videoID +
                    "&callback=callback";
            
            return bvRetrieveRatingURL;
    }*/
    
    function constructRatingDetails(bvHost, bvPassKey, videoID) {
            var bvRatingDetailsURL = "http://" + bvHost + "/data/reviews.json?apiversion=" + 
                    _bvAPIVersion + "&passkey=" + bvPassKey + "&filter=productId:" + videoID +
                    "&include=products&stats=reviews";
            
            return bvRatingDetailsURL;
    }
    
    function getOffsets(obj) {
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return [curleft, curtop];
    }

    /**----------------------------UNIQUE ID **/
    function uniqueid() {
        // always start with a letter (for DOM friendlyness)
        var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
        do {                
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode=Math.floor((Math.random()*42)+48);
            if (ascicode<58 || ascicode>64){
                // exclude all chars between : (58) and @ (64)
                idstr+=String.fromCharCode(ascicode);    
            }                
        } while (idstr.length<32);
        
        return (idstr);
    }
    
    function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    }

    function debug (message) {
        if (window.console) {
            console.log(message);
        }
        return;
    }
        
}());
