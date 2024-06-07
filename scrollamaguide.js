// THis is a basic example to make Scrollama work with alot of different map styles.... we just want to make it so that the maps change with each chapter id defined later on... 
//first set up the function to initialize the various map styles 
function initializeMapStyle(style, containerId) {
    return new Promise((resolve, reject) => {
        if (style) {
            var map = new mapboxgl.Map({
                container: containerId,
                style: style,
                accessToken: 'YOURAPIKEY',
            });

            map.on('load', () => {
                resolve(map);
            });
        } else {
            resolve(null); // Resolve immediately if no style 
        }
    });
}

// Code for changing styles while scrolling add more below 
const mapStyles = {
    '0': 
    '1': 
    '2': 
    '3': 
    '4': 
    '5': 
    '6': 
    //this is the id of the chapters that you want the maps to be in for scollama. 
};

// Prepare to initialize all map styles
var mapStylePromises = [];
Object.keys(mapStyles).forEach(key => {
    mapStylePromises.push(initializeMapStyle(mapStyles[key], 'mapContainer' + key));
});

//start of the storytelling mode from mapbox. 
var config = {
    style:  '',
    accessToken: '',
    showMarkers: 'true',
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
    theme: 'light',
    use3dTerrain: false, //set true for enabling 3D maps.
    title: '',
    subtitle: '',
    byline: '',
    para1:'',
    para2:'',
    footer: '<br> Brief Created by Owen(Rong) Luo using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.', //By Rong (Owen) Luo, AAF Research 



//to insert tablux chart: use this in the discription: <br><br><iframe src="https://public.tableau.com/views/CongressionalDistrict3Asianvoters/Story1?:language=en-GB&:display_count=n&:origin=viz_share_link" width="600" height="400"></iframe>

//chapter begins: 
chapters: [
    {
        id: '0',  //1 is screen 0 
        alignment: 'right',
        hidden: false,
        callback: 'initializeMap',
        title:'Introduction',

        description: 'Stretching from northeastern Queens to the suburbs of Nassau County, New York’s 3rd Congressional District encompasses a socially and economically diverse group of voters. Thus, it is an important bellwether for the general elections this fall. Of special significance is the increasing Asian population within the district, which has become a pivotal factor in influencing its political landscape and bringing about significant changes in voting trends.The district’s recent electoral history showcases its competitive nature, with Asian voters playing a crucial role as a growing and influential group. This report analyzes changes in voting patterns between the 2022 general election and the 2024 special election, particularly among Asian voters. We seek to explore how these changes affect electoral outcomes and policy directions. This effort will offer insights into the evolving political dynamics of the district and, as Asian American voters continue to grow in numbers and strength, the country.',
        location: {
            center: [-73.55, 40.75],
            zoom: 8,
            pitch: 0,
            bearing: 0
        },
        mapAnimation: 'flyTo',
        rotateAnimation: false,
        onChapterEnter: [
        ],
        onChapterExit: [
        ]
    },

    //add more chapters here. 

    // Define configurations and helper functions
var initLoad = true;
var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
};

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
};

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function(prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}

// HTML element creation for the storytelling
var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');
var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('h4');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (config.para1) {
    var paragraphOne = document.createElement('p');
    paragraphOne.innerText = config.para1;
    header.appendChild(paragraphOne);
}

if (config.para2) {
    var paragraphTwo = document.createElement('p');
    paragraphTwo.innerText = config.para2;
    header.appendChild(paragraphTwo);
}

if (header.childNodes.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');
    chapter.classList.add(config.theme);

    container.setAttribute('id', record.id);
    container.classList.add('step', alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    if (idx === 0) {
        container.classList.add('active');
    }


    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

// Check if the subtitle exists and then append it
if (record.subtitle) {
    var subtitle = document.createElement('h4'); // Using h4 for subtitle
    subtitle.innerText = record.subtitle;
    subtitle.style.color = "#555"; // Optional: style the subtitle
    subtitle.style.marginTop = "10px"; // Optional: add margin to separate from title
    subtitle.style.fontSize = "13px"; // Optional: adjust font size
    chapter.appendChild(subtitle);
}

    if (record.image) {
        var img = document.createElement('img');
        img.src = record.image;
        chapter.appendChild(img);
    }

    if (record.map) {
        var mapDiv = document.createElement('div');
        mapDiv.className = 'map-container';
        mapDiv.id = 'mapContainer' + record.id;
        chapter.appendChild(mapDiv);
    }

    if (record.description) {
        var description = document.createElement('p');
        description.innerHTML = record.description;
        chapter.appendChild(description);
    }
    

    if (record.object) {
        var objectElem = document.createElement('object');
        objectElem.data = record.object.src;
        objectElem.type = 'text/html';
        objectElem.style.width = record.object.width;
        objectElem.style.height = record.object.height;
        objectElem.style.border = '0';
        objectElem.id = 'object-' + record.id;
        chapter.appendChild(objectElem);
    }

// Check if the chapter has multiple iframes
function appendIframe(iframeInfo, index, prefix, chapter) {
    var iframe = document.createElement('iframe');
    iframe.src = iframeInfo.src;
    iframe.style.width = iframeInfo.width;
    iframe.style.height = iframeInfo.height;
    iframe.style.border = '0';
    iframe.id = 'iframe-' + prefix + record.id + '-' + index;
    // iframe.onload = function() {
    //     updateMapStyle(record.id);
    // };
    chapter.appendChild(iframe);
}

// Check for the first set of iframes
if (record.iframes && Array.isArray(record.iframes)) {
    record.iframes.forEach(function(iframeInfo, index) {
        appendIframe(iframeInfo, index, 'set1-', chapter);
    });
} else if (record.iframe) {
    appendIframe(record.iframe, 0, 'set1-', chapter);
}

if (record.mapnote) {
    var mapnote = document.createElement('p');
    mapnote.innerHTML = record.mapnote;
    chapter.appendChild(mapnote);
}

// Check for the second set of iframes
if (record.iframes2 && Array.isArray(record.iframes2)) {
    record.iframes2.forEach(function(iframeInfo, index) {
        appendIframe(iframeInfo, index, 'set2-', chapter);
    });
} else if (record.iframe2) {
    appendIframe(record.iframe2, 0, 'set2-', chapter);
}

    if (record.description2) {
        var description2 = document.createElement('p');
        description2.innerHTML = record.description2;
        chapter.appendChild(description2);
    }

    if (record.image2) {
        var img2 = document.createElement('img');
        img2.src = record.image2;
        chapter.appendChild(img2);
    }

    if (record.description3) {
        var description3 = document.createElement('p');
        description3.innerHTML = record.description3;
        chapter.appendChild(description3);
    }

    if (record.iframes3 && Array.isArray(record.iframes3)) {
        record.iframes3.forEach(function(iframeInfo, index) {
            appendIframe(iframeInfo, index, 'set3-', chapter);
        });
    } else if (record.iframe3) {
        appendIframe(record.iframe3, 0, 'set3-', chapter);
    }

    if (record.image3) {
        var img3 = document.createElement('img');
        img3.src = record.image3;
        chapter.appendChild(img3);
    }

    if (record.description4) {
        var description4 = document.createElement('p');
        description4.innerHTML = record.description4;
        chapter.appendChild(description4);
    }
    if (record.description5) {
        var description5 = document.createElement('p');
        description5.innerHTML = record.description5;
        chapter.appendChild(description5);
    }
    if (record.video) {
        var videoDiv = document.createElement('div');
        videoDiv.className = 'videoContainer';
        var video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.src = record.video;
        videoDiv.appendChild(video);
        chapter.appendChild(videoDiv);
    }

    if (record.button) {
        var button = document.createElement('a');
        button.href = record.button.url;
        button.classList.add('continue-button');
        button.innerHTML = `<i class="fa ${record.button.icon}"></i> ${record.button.text}`;
        chapter.appendChild(button);
    }

    container.appendChild(chapter);

// I made it so that some of the chapters are hidden so that a legend could be seemlessly intergrated into the chapters with the background maps.
//here is the basic code stucture for Creating legends for backgroundmaps based on chapter id
var legend = document.createElement('div');
legend.className = 'legend';
if ((idx === 3)) {
    legend.innerHTML = `<div class='legend' id='legend'> 
    <h4>Legend</h4>
    <ul style="list-style-type: none;">
        <li><span style="background-color:#d7d5e8; width: 10px; height: 12px; display:inline-block;"></span> 0%</li>
        <li><span style="background-color:#bcb9d8; width: 10px; height: 12px; display:inline-block;"></span> 12.5%</li>
        <li><span style="background-color:#9a96c5; width: 10px; height: 12px; display:inline-block;"></span> 25%</li>
        <li><span style="background-color:#7973b2; width: 10px; height: 12px; display:inline-block;"></span> 37.5%</li>
        <li><span style="background-color:#58509e; width: 10px; height: 12px; display:inline-block;"></span> 50%</li>
        <li><span style="background-color:#362D8B; width: 10px; height: 12px; display:inline-block;"></span> 62.5%</li>
        <li><span style="background-color:#2d2674; width: 10px; height: 12px; display:inline-block;"></span> 75%</li>
        <li><span style="background-color:#241E5D; width: 10px; height: 12px; display:inline-block;"></span> 87.5%</li>
        <li><span style="background-color:#1B1746; width: 10px; height: 12px; display:inline-block;"></span> 100%</li>
    </ul>
</div>`;
} 
else if ( idx===14 || idx===15 || idx === 27 || idx === 28) {
    legend.innerHTML = `<div class='legend' id='legend'>
    <h4>Voter Turnout Rate Legend</h4>
    <ul style="list-style-type: none;">
        <li><span style="background-color:#d7d5e8; width: 10px; height: 12px; display:inline-block;"></span> 0%</li>
        <li><span style="background-color:#9a96c5; width: 10px; height: 12px; display:inline-block;"></span> 25%</li>
        <li><span style="background-color:#58509e; width: 10px; height: 12px; display:inline-block;"></span> 50%</li>
        <li><span style="background-color:#2d2674; width: 10px; height: 12px; display:inline-block;"></span> 75%</li>
        <li><span style="background-color:#1B1746; width: 10px; height: 12px; display:inline-block;"></span> 100%</li>
    </ul>
</div>`;
} 
else if (idx === 6 || idx === 8|| idx === 10) {
    legend.innerHTML = `<div class='legend' id='legend'>
    <h4>Election Results Legend</h4>
    <ul style="list-style-type: none;">
        <li><span style="background-color:hsl(4, 82%, 42%); width: 10px; height: 12px; display:inline-block;"></span> 80% Republican</li>
        <li><span style="background-color:#f9c2c2; width: 10px; height: 12px; display:inline-block;"></span> 60% Republican</li>
        <li><span style="background-color:#b6d2f1; width: 10px; height: 12px; display:inline-block;"></span> 60% Democratic</li>
        <li><span style="background-color:hsl(212, 68%, 46%); width: 10px; height: 12px; display:inline-block;"></span> 80% Democratic</li>
    </ul>
</div>
  `;
// } else if (idx >= 8 && idx <= 9) {
//     legend.innerHTML = `<div class='legend' id='legend'>
//     <h4>Legend</h4>
//     <ul style="list-style-type: none;">
//         <li><span style="background-color:hsl(4, 82%, 42%); width: 10px; height: 12px; display:inline-block;"></span> 20%</li>
//         <li><span style="background-color:#f9c2c2; width: 10px; height: 12px; display:inline-block;"></span> 40%</li>
//         <li><span style="background-color:#b6d2f1; width: 10px; height: 12px; display:inline-block;"></span> 60%</li>
//         <li><span style="background-color:hsl(212, 68%, 46%); width: 10px; height: 12px; display:inline-block;"></span> 80%</li>
//     </ul>
// </div>
//   `;
} else {
    legend = null;  //no legend
}

if (legend) {
    container.appendChild(legend);
}
    features.appendChild(container);
});


story.appendChild(features);

var footer = document.createElement('div');
if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}
if (footer.childNodes.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

function generateTableOfContents() {
    var toc = document.createElement('ul');
    config.chapters.forEach((chapter) => {
        if (!chapter.hidden) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.href = `#${chapter.id}`;
            link.innerText = chapter.title || `Chapter ${chapter.id}`;
            listItem.appendChild(link);
            toc.appendChild(listItem);
        }
    });
    document.getElementById('toc').innerHTML = ''; // Clear previous TOC if needed
    document.getElementById('toc').appendChild(toc);
}

// Map and Mapbox access token setup
mapboxgl.accessToken = config.accessToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false,
    transformRequest: function (url) {
        const hasQuery = url.indexOf("?") !== -1;
        const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
        return { url: url + suffix };
    },
    projection: config.projection
});

// Create a inset map if enabled in config.js
if (config.inset) {
    var insetMap = new mapboxgl.Map({
        container: 'mapInset',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: config.chapters[0].location.center,
        zoom: 3,
        hash: false,
        interactive: false,
        attributionControl: false
    });
}
// Instantiate the scrollama
var scroller = scrollama();
scroller.setup({
    step: '.step',
    offset: 0.25,
    progress: true
})

.onStepEnter(response => {
    var chapter = config.chapters.find(chap => chap.id === response.element.id);
    response.element.classList.add('active');
    map[chapter.mapAnimation || 'flyTo'](chapter.location);

    // Check and change map style more reliably
    const currentStyle = mapStyles[chapter.id];
    if (currentStyle && map.getStyle().styleURL !== currentStyle) {
        if (map.isStyleLoaded()) {  // Ensure the current style is fully loaded
            map.setStyle(currentStyle);
        } else {
            map.once('style.load', () => {  // Wait for the style to load before setting a new one
                map.setStyle(currentStyle);
            });
        }
    }

    if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
    }

    if (config.inset) {
        insetMap.flyTo({
            center: chapter.location.center,
            zoom: chapter.location.zoom < 5 ? 0 : 3
        });
    }
})
.onStepExit(response => {
    var chapter = config.chapters.find(chap => chap.id === response.element.id);
    response.element.classList.remove('active');
    if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
    }
});


// Helper functions for inset map
function getInsetBounds() {
    let bounds = map.getBounds();
    let boundsJson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [bounds._sw.lng, bounds._sw.lat],
                        [bounds._ne.lng, bounds._sw.lat],
                        [bounds._ne.lng, bounds._ne.lat],
                        [bounds._sw.lng, bounds._ne.lat],
                        [bounds._sw.lng, bounds._sw.lat]
                    ]
                ]
            }
        }]
    };

    if (initLoad) {
        addInsetLayer(boundsJson);
        initLoad = false;
    } else {
        updateInsetLayer(boundsJson);
    }
}

function addInsetLayer(bounds) {
    insetMap.addSource('boundsSource', {
        'type': 'geojson',
        'data': bounds
    });

    insetMap.addLayer({
        'id': 'boundsLayer',
        'type': 'fill',
        'source': 'boundsSource',
        'layout': {},
        'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.2
        }
    });

    insetMap.addLayer({
        'id': 'outlineLayer',
        'type': 'line',
        'source': 'boundsSource',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 1
        }
    });
}

document.getElementById('tocButton').addEventListener('click', function() {
    var toc = document.getElementById('toc');
    toc.style.display = (toc.style.display === 'none' || toc.style.display === '') ? 'block' : 'none';

    var downloadButton = document.getElementById('downloadPdfButton');
    if (!downloadButton) {
        downloadButton = document.createElement('button');
        downloadButton.id = 'downloadPdfButton';
        downloadButton.textContent = 'Download The Summary Sheet';
        downloadButton.style.padding = '5px';
downloadButton.style.backgroundColor = 'white'; 
downloadButton.style.color = 'rgba(54, 45, 139, 1)';
downloadButton.style.border = '1px solid #ccc';
downloadButton.style.margin = '5px 0';
        downloadButton.onclick = function() {
            var link = document.createElement('a');
            link.href = 'CongressionalDistrict3SummarySheet.pdf'; 
            link.download = 'CongressionalDistrict3SummarySheet.pdf'; 
            link.dispatchEvent(new MouseEvent('click'));
        };
        // Hover effect
        downloadButton.onmouseover = function() {
            this.style.backgroundColor = '#f0f0f0';
        };
        downloadButton.onmouseout = function() {
            this.style.backgroundColor = 'white'; 
        };

        toc.insertBefore(downloadButton, toc.firstChild);
    }
});
document.querySelectorAll('#toc a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 

        const chapterId = this.getAttribute('href').substring(1); 
        const chapterElement = document.getElementById(chapterId); 
        const descriptionElement = chapterElement.querySelector('.description'); 

        if (descriptionElement) {
            const elementRect = descriptionElement.getBoundingClientRect();
            const descriptionCenter = window.pageYOffset + elementRect.top + elementRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const scrollTarget = descriptionCenter - viewportCenter + scrollOffset;  

            console.log("Scrolling to:", scrollTarget);
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        }
    });
});
generateTableOfContents();
setupLegendButtons();


function updateInsetLayer(bounds) {
    insetMap.getSource('boundsSource').setData(bounds);
}
// !function() {
//     "use strict";
//     window.addEventListener("message", function(event) {
//         if (typeof event.data["datawrapper-height"] !== 'undefined') {
//             for (var chartId in event.data["datawrapper-height"]) {
//                 var iframe = document.getElementById("datawrapper-chart-" + chartId);
//                 if (iframe) {
//                     iframe.style.height = event.data["datawrapper-height"][chartId] + "px";
//                 }
//             }
//         }
//     });
// }();