(function () {
    //global variables
    var _mediaAPIToken = "ILssOMrqpCo7eJh0weJVl8x21BEeaoE-eTtpiCrIcmc.";
    var _bvHostName = "apitestcustomer.ugc.bazaarvoice.com/bvstaging";
    var _bvPassKey = "stq9t01nsnvlk2drx5b7q5zzm";
    var _parentURL = window.location.href;
    var _bvAPIVersion = "5.4";
    var _videoID,
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
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

    // Pernix O

    // Keen

    var _keenVideoID; // _bvVideoID --> _keenVideoID
    var _keenUserName;// _bvUserName --> `


    // Configure a new Keen JS client

    var keenClientTest;

    var _projectId = "550b409859949a13d1afbe31";
    var _writeKey = "7c143a3347f7adc7c48f6820a58551175cc76a94aeb34d80afc26f9a111f28dde965e160f4287089352004454fe66bcdeab5035fb8d9e5aaec7a1d47976dec0bd45933e5daab014002a38f1d9da65ec2538a4938239ff7e3e16cb0941094003492c99d244010fc894b694c401f1d612b";
    var _readKey = "97d46eeb80dea57583e9a01f21342635a6157b6caac3dcb65f905d1c4671c1570290e4625ed54f695884a15edbca6f70bb53333b8f55e586c75dc99141a7dbc103fc7984ded87494f36cc6826c0a750f3c62a9f4fd93bfad88b7d6ab27d910704d02b645614c889f9ad496a75cacc897";
    var _protocol = "https";
    var _host = "api.keen.io/3.0";
    var _requestType = "jsonp";

    function setupTest() {

        console.log('setup test');

        keenClientTest = new Keen({
            projectId: _projectId,   // String (required always)
            writeKey: _writeKey,     // String (required for sending data)
            readKey: _readKey,       // String (required for querying data)
            protocol: _protocol,
            host: _host,
            requestType: _requestType
        });
    }

    //Keen.ready(function () {
    //    console.log('Keen IO is ready');
    //    // Send it to the "purchases" collection
    //});

    function sendInfoTest() {

        console.log('Send info test');

        keenClientTest.addEvent('test', constructSubmitKeenRating(_keenVideoID, 5), function (err, res) {
            if (err) {
                // there was an error!
                console.log('Keen.io summit test error: ', err);
            }
            else {
                console.log('Successful summit test delivery: ', res);
            }
        });
    }



    function getInitEvent() {
        // Create a data object with the test properties
        var initEvent = {
            type: 'setup test',
            keen: {
                timestamp: new Date().toISOString()
            }
        };

        return initEvent;
    }

    // Pernix C


    // retrieve bvHostName
    if (_parentURL.indexOf('bvHostname=') !== -1) {
        console.log("***host name is in the URL!***");

        var bvHostIndex = _parentURL.indexOf('bvHostname=');
        _bvHostName = _parentURL.substring(bvHostIndex + 11);

        console.log("***host name is :" + _bvHostName);

        // substring until next query arg if it is not the last in URL
        if (_bvHostName.indexOf('&') !== -1) {
            var bvHostEndIndex = _bvHostName.indexOf('&');
            _bvHostName = _bvHostName.substring(0, bvHostEndIndex);
        }
        console.log("Final Host: " + _bvHostName);
    }

    // retrieve bvPassKey
    if (_parentURL.indexOf('bvPassKey=') !== -1) {
        console.log("***Pass Key is in the URL!***");

        var bvPassIndex = _parentURL.indexOf('bvPassKey=');
        _bvPassKey = _parentURL.substring(bvPassIndex + 10);

        console.log("***Pass Key is :" + _bvPassKey);

        // substring until next query arg if it is not the last in URL
        if (_bvPassKey.indexOf('&') !== -1) {
            var bvPassEndIndex = _bvPassKey.indexOf('&');
            _bvPassKey = _bvPassKey.substring(0, bvPassEndIndex);
        }
        console.log("Final Host: " + _bvPassKey);
    }

    var player,
        videoPlayerModule,
        experienceModule;

    player = brightcove.api.getExperience();
    videoPlayerModule = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    experienceModule = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);

    if (experienceModule.getReady()) {
        initialize();
    }
    else {
        experienceModule.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, initialize);
    }

    //listening for events
    function initialize(evt) {
        console.log("***INITIALIZE API***");


        // embed Keen.io to iframe DOM
        loadKeenIOScripSync();

        // --------- APPEND TAG THAT HOLDS CUSTOM ELEMENTS        
        videoTag = document.getElementById('bcVideo');
        var offsets = getOffsets(videoTag);
        var playerHeight = window.innerHeight;
        console.log("Player Height: " + playerHeight);
        var playerWidth = window.innerWidth;
        console.log("Player Width: " + playerWidth);
        var videoParent = $(videoTag).parent();

        $(document.body).append('<div id="custom-elements"></div>');
        $('#custom-elements').css({
            'position': 'absolute',
            'top': (playerHeight - (40 + offsets[1] + 6)) + 'px',
            'left': offsets[0] + 'px',
            'z-index': '6',
            'right': offsets[0] + 'px'
        });
        // ---------

        displayUIButtons();

        //construct URL
        videoPlayerModule.getCurrentVideo(constructURLs);

        // add Media Events
        videoPlayerModule.addEventListener(brightcove.api.events.MediaEvent.CHANGE, onMediaChange);
    }

    function constructURLs(result) {
        _videoID = result.id;
        _bvVideoID = "bcvid-" + _videoID; // TODO remove

        _keenVideoID = 'keeid-' + _videoID;

        // construct URLS for API // TODO remove
        console.log(constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID)); // TODO remove
        console.log(constructRatingDetails(_bvHostName, _bvPassKey, _videoID)); // TODO remove

        console.log(constructSubmitKeenRating(_videoID));
        console.log(constructRatingKeenDetails(_videoID));


        // get existing cookies on Player Load // TODO remove
        console.log("Player Load First Video ID: " + _bvVideoID); // TODO remove

        // get existing cookies on Player Load
        console.log("Player Load First Video ID: " + _keenVideoID);

        // check first video for cookies // TODO remove
        checkVideoForCookies(_bvVideoID); // TODO remove

        // check first video for cookies
        checkVideoKeenForCookies(_keenVideoID);

        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }

    /**--------------------------------------------------------- URL REQUEST FUNCTIONS **/

    $(document).ready(function () {
        console.log("Jquery");
        console.log(uniqueid());
    });

    /**--------------------------------------------------------- EVENT HANDLERS **/

    function onMediaChange() {
        console.log("Media Change");
        resetButtonIcons();
        videoPlayerModule.getCurrentVideo(changeVidCallback);
    }

    function changeVidCallback(result) {
        _videoID = result.id;
        _bvVideoID = "bcvid-" + _videoID;

        console.log("Media Change: " + _bvVideoID);
        checkVideoForCookies();

        getCurrentVideoRatings(_bvVideoID);
        displayTotalViews(_videoID);
    }

    function onThumbsUpClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if (!_uniqueID) {
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0, 23);
        }

        if (!guidCookie) {
            disableButtons();
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",5");
            enableThumbsUpIcon();

            // submit rating
            submitRating('5');
        } else {
            console.log("You already have a GUID: " + guidCookie);
        }
    }

    function onThumbsDownClick() {
        // if unique ID is not set for this user yet...i.e., it's their first rating
        if (!_uniqueID) {
            _uniqueID = uniqueid();
            _bvUserName = _uniqueID.substr(0, 23);
        }

        if (!guidCookie) {
            disableButtons();
            setCookie(_bvVideoID, _uniqueID + "," + _bvVideoID + ",1");
            enableThumbsDownIcon();

            // submit rating
            submitRating('1');
        } else {
            console.log("You already have a GUID: " + guidCookie);
        }
    }

    function submitRating(rating) {
        $.post(constructSubmitRating(_bvHostName, _bvPassKey, _bvVideoID, rating) + "&callback=?",
            function (json) {
                console.log(json);
            });
    }

    function enableThumbsUpIcon() {
        console.log($('#thumbs-up'));
        $('#thumbs-up').children('img').attr('src', THUMBS_UP_IMG_ON);
    }

    function enableThumbsDownIcon() {
        console.log($('#thumbs-down'));
        $('#thumbs-down').children('img').attr('src', THUMBS_DOWN_IMG_ON);
    }

    function disableButtons() {
        $('#thumbs-up').unbind("click", onThumbsUpClick);
        $('#thumbs-down').unbind("click", onThumbsDownClick);
        $('#thumbs-up, #thumbs-down').css({'cursor': 'auto'});
    }

    function resetButtonIcons() {
        $('#thumbs-up').children('img').attr('src', THUMBS_UP_IMG);
        $('#thumbs-down').children('img').attr('src', THUMBS_DOWN_IMG);
        $('#thumbs-up, #thumbs-down').css({'cursor': 'pointer'});
    }

    /**--------------------------------------------------------- UI ELEMENTS **/

    function displayUIButtons() {
        $('#custom-elements').append('<div class="ratings"><div id="thumbs-up"><img src="' + THUMBS_UP_IMG + '" /></div><div id="thumbs-down"><img src="' + THUMBS_DOWN_IMG + '" /></div></div>');
        $('.ratings').css('width', '125px');
        $('#thumbs-up, #thumbs-down').css({
            'float': 'left',
            'position': 'relative',
            'z-index': '5',
            'margin-right': '10px',
            'cursor': 'pointer'
        });
        console.log("display UI Buttons");
    }

    function drawBarGraph(likes, dislikes) {
        // remove any existing bar graph data
        $('#video-ratings').remove();

        // convert amount of likes to percent
        var totalVotes = likes + dislikes;
        var likesPercent = totalVotes ? likes / totalVotes : 0;

        console.log("Percentage of Likes: " + likesPercent + "%");

        // to get width, multiply width of bar against percent
        var likeBarWidth = 178 * likesPercent;

        $('#custom-elements').append('<div id="video-ratings" style="position:relative;float:left;width:178px;top:0;"><canvas id="barGraphBG" width="178" height="8" style="position:absolute;top:0;left:0;"></canvas></div>');

        var canvasBG = document.getElementById('barGraphBG');
        var contextBG = canvasBG.getContext('2d');

        contextBG.beginPath();
        contextBG.rect(0, 0, 178, 8);
        contextBG.fillStyle = "#bbbbbb";
        contextBG.fill();

        console.log(canvasBG);

        $('#video-ratings').append('<canvas id="canvasLikes" width="178" height="8" style="position:absolute;top:0px;left:0;"></canvas>');

        var likeCanvas = document.getElementById('canvasLikes');
        var likeContext = likeCanvas.getContext('2d');
        var likeWidth = likeBarWidth;

        likeContext.beginPath();
        likeContext.rect(0, 0, likeWidth, 8);
        likeContext.fillStyle = "#0990d2";
        likeContext.fill();

        console.log(likeCanvas);

        // print likes and dislikes
        $('#video-ratings').append('<p id="total-likes"></p>');
        $('#video-ratings').append('<p id="total-dislikes"></p>');
        $('#video-ratings > p').css({
            'font-family': 'Arial',
            'font-size': '10px',
            'font-weight': 'bold',
            'position': 'absolute',
            'top': '2px',
        });
        $('#video-ratings > p:last-child').css({'right': '0'});

        var totalLikesDiv = document.getElementById('total-likes');
        var totalDislikesDiv = document.getElementById('total-dislikes');

        totalLikesDiv.innerHTML = (likes == 1) ? likes + " Like" : likes + " Likes";
        totalDislikesDiv.innerHTML = (dislikes == 1) ? dislikes + " Dislike" : dislikes + " Dislikes";
        console.log($('#video-ratings'));
    }

    function displayTotalViews(videoID) {
        // remove any existing views tags
        $('#total-video-views').remove();

        // re-add to custom DIV
        $('#custom-elements').append('<div id="total-video-views" style="float:right;font-family:Arial;font-size:16px;font-weight:bold;position:relative;top:8px;"></div>');

        // overwrite Media API token if present in override variables
        if (_parentURL.indexOf('apiToken=') !== -1) {
            apiTokenIndex = _parentURL.indexOf('apiToken=');
            _mediaAPIToken = _parentURL.substring(apiTokenIndex + 9);

            if (_mediaAPIToken.indexOf('&') !== -1) {
                apiTokenEndIndex = _mediaAPIToken.indexOf('&');
                _mediaAPIToken = _mediaAPIToken.substring(0, apiTokenEndIndex);
            }

            console.log("Media API Token was overriden to: " + _mediaAPIToken);
        }

        var mediaAPIRequest = "http://api.brightcove.com/services/library?command=find_video_by_id&video_fields=playsTotal&token=" + _mediaAPIToken + "&video_id=" + videoID;
        console.log(mediaAPIRequest);

        $.getJSON(mediaAPIRequest + "&callback=?", function (data) {
            var items = [];

            var playsTotal = data.playsTotal ? data.playsTotal : "0";
            playsTotal += " Views";

            $('#total-video-views').text(playsTotal);
        });

    }

    /**--------------------------------------------------------- SET/GET COOKIES **/
    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(';');
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x == c_name) {
                return unescape(y);
            }
        }
    }

    // TODO remove
    function checkVideoForCookies(_bvVideoId) {
        console.log("Check Video for Cookies");
        guidCookie = getCookie(_bvVideoID);

        if (guidCookie) {
            console.log("(Check Video For Cookies) This Video already has a GUID cookie: " + guidCookie);

            var cookieArray = guidCookie.split(",");
            console.log(cookieArray);

            // set the uniqueID to the existing one in the cookie:
            _uniqueID = cookieArray[0];
            console.log("Existing User ID Found: " + _uniqueID);
            _bvUserName = _uniqueID.substr(0, 23);

            if (cookieArray.indexOf(_bvVideoID) !== -1) {
                console.log("This is the Video recorded in the cookie!");
                console.log(cookieArray[2]);
                if (cookieArray[2] == "5") {
                    console.log("This Video was rated a Thumbs Up!");
                    $('#thumbs-up').ready(function () {
                        console.log("Thumbs Up is ready.");
                    });
                    enableThumbsUpIcon();
                } else if (cookieArray[2] == "1") {
                    console.log("This Video was rated a Thumbs Down...");
                    $('#thumbs-down').ready(function () {
                        console.log("Thumbs Down is ready.");
                        enableThumbsDownIcon();
                    });
                }
            }

            //unbind click events and remove cursor css
            disableButtons();

        } else {
            console.log("This Video doesn't have any existing cookies on this browser, attach click events");
            // attach click handlers
            $('#thumbs-up').bind("click", onThumbsUpClick);
            $('#thumbs-down').bind("click", onThumbsDownClick);
            console.log("Click listeners bound");
        }
    }

    function getCurrentVideoRatings(currentBVVideoID) {
        var likes = 0;
        var dislikes = 0;

        console.log(constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID));
        // --------- KEEP IN SEPARATE FUNCTION??? (getCurrentVideoRatings?)
        $.ajaxSetup({cache: true});
        $.getJSON(constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) + "&callback=?",
            function (json) {
                console.log("JSONP Response: ");
                console.log(json);
                jQuery.each(json.Results, function (index, result) {
                    console.log(result);
                    if (result.Rating == "1") {
                        console.log("Increment Dislikes");
                        dislikes++;
                    } else if (result.Rating == "5") {
                        console.log("Increment Likes");
                        likes++;
                    }
                });
                console.log("Total Likes: " + likes);
                console.log("Total Dislikes: " + dislikes);

                drawBarGraph(likes, dislikes);
            });
        // ---------
    }

    /**--------------------------------------------------------- URL CONSTRUCT FUNCTIONS **/

    // TODO remove
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
        var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
            var ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                // exclude all chars between : (58) and @ (64)
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < 32);

        return (idstr);
    }

    //function console.log(message) {
    //    //return;
    //    console.log(message);
    //}


    /* Pernix Open*/

    function loadKeenIOScripSync() {
        var scriptKeen = document.createElement('script');
        scriptKeen.onload = function () {
            setupTest();
            sendInfoTest();
        };
        scriptKeen.type = "text/javascript";
        scriptKeen.src = "https://d26b395fwzu5fz.cloudfront.net/3.2.4/keen.min.js";
        scriptKeen.async = false;
        document.getElementsByTagName('head')[0].appendChild(scriptKeen);

        sendInfoTest();
    }

    function constructSubmitKeenRating(videoID, userRating){
        // Create a data object with the properties you want to send
        var videoRating = {
            videoID: videoID,
            userRating: userRating,
            keen: {
                timestamp: new Date().toISOString()
            }
        };

        return videoRating;
    }

    // TODO make
    function constructRatingKeenDetails(videoID) {

    }

    function checkVideoKeenForCookies() {
        console.log("Check Video for Cookies");
        guidCookie = getCookie(_keenVideoID);

        if (guidCookie) {
            console.log("(Check Video For Cookies) This Video already has a GUID cookie: " + guidCookie);

            var cookieArray = guidCookie.split(",");
            console.log(cookieArray);

            // set the uniqueID to the existing one in the cookie:
            _uniqueID = cookieArray[0];
            console.log("Existing User ID Found: " + _uniqueID);
            _keenUserName = _uniqueID.substr(0, 23);

            if (cookieArray.indexOf(_bvVideoID) !== -1) {
                console.log("This is the Video recorded in the cookie!");
                console.log(cookieArray[2]);
                if (cookieArray[2] == "5") {
                    console.log("This Video was rated a Thumbs Up!");
                    $('#thumbs-up').ready(function () {
                        console.log("Thumbs Up is ready.");
                    });
                    enableThumbsUpIcon();
                } else if (cookieArray[2] == "1") {
                    console.log("This Video was rated a Thumbs Down...");
                    $('#thumbs-down').ready(function () {
                        console.log("Thumbs Down is ready.");
                        enableThumbsDownIcon();
                    });
                }
            }

            //unbind click events and remove cursor css
            disableButtons();

        } else {
            console.log("This Video doesn't have any existing cookies on this browser, attach click events");
            // attach click handlers
            $('#thumbs-up').bind("click", onThumbsUpClick);
            $('#thumbs-down').bind("click", onThumbsDownClick);
            console.log("Click listeners bound");
        }
    }

    function getCurrentVideoRatings(currentBVVideoID) {
        var likes = 0;
        var dislikes = 0;

        console.log(constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID));


        // --------- KEEP IN SEPARATE FUNCTION??? (getCurrentVideoRatings?)
        $.ajaxSetup({cache: true});
        $.getJSON(constructRatingDetails(_bvHostName, _bvPassKey, _bvVideoID) + "&callback=?",
            function (json) {
                console.log("JSONP Response: ");
                console.log(json);
                jQuery.each(json.Results, function (index, result) {
                    console.log(result);
                    if (result.Rating == "1") {
                        console.log("Increment Dislikes");
                        dislikes++;
                    } else if (result.Rating == "5") {
                        console.log("Increment Likes");
                        likes++;
                    }
                });
                console.log("Total Likes: " + likes);
                console.log("Total Dislikes: " + dislikes);

                drawBarGraph(likes, dislikes);
            });
        // ---------
    }



    /* Perni Close*/

}());