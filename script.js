// modal output for recording moves
let modalOutput = document.getElementsByClassName('algorithm-modal')
let paraOutput = document.getElementById('modal-para')

// input for generated scrambles
let scrambleEl = document.getElementById('scramble-input')

// face rotation buttons default rotation
let faceRotateBtns = document.querySelectorAll('.face-rotate-btn')
// face rotation buttons prime rotation
let faceRotatePrimeBtns = document.querySelectorAll('.face-rotate-prime-btn')
// cube rotation buttons default rotation
let cubeRotationBtns = document.querySelectorAll('.cube-rotate-btn')
// cube rotation buttons prime rotation
let cubeRotatePrimeBtns = document.querySelectorAll('.cube-rotate-prime-btn')
// buttons for double rotations
let doubleFaceRotationBtns = document.querySelectorAll('.face-double-rotate-btn')

  //  listener for buttons executing DEFAULT face rotations
  faceRotateBtns.forEach(button =>{
button.addEventListener('click', event =>{
  faceRotate(event.target.id)
})
})
  //  listener for buttons executing PRIME face rotations
  faceRotatePrimeBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })

  //  listener for buttons executing DEFAULT cube rotations
  cubeRotationBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })
  //  listener for buttons executing PRIME cube rotations
  cubeRotatePrimeBtns.forEach(button =>{
    button.addEventListener('click', event =>{
      faceRotate(event.target.id)
    })
    })

    doubleFaceRotationBtns.forEach(button =>{
      button.addEventListener('click', event =>{
        faceRotate(event.target.id, 'double')
      })
      })

 // face elements
let faceElements = document.querySelectorAll('.face-element')
faceElements.forEach(button =>{
  button.addEventListener('click', event =>{
    console.log(event.target.parentNode.id)
    console.log('which facet clicked')

  })
  })

  let cubeStateBtns = document.querySelectorAll('.cube-state-btn')

  // array to only alloqw characters that are  related to cube rotations, 
  let moveCharacters = [ 'U', 'D', 'L', 'R', 'B', 'F', '\'']
// preventing double appostrophes  - you could change the characters into a string and if two appostrophes are adjacent to each other then alert user of mistake.

// the following array, which represents the entire cube, sets out the faces in a way that is human readable.  Each subarray, which represents one face of the cube,  contains three subarrays, each of which represents the  layer of the cube, on which the row sits, as seen when looking directly at that face.  subarray[0]/[1]/[2] represent top, middle, bottom rows respectively (last, second and first layer respectively), and columns 1/2/3 represent L, M and R in cube notation (i.e. left, middle and right)
let cubeMatrixAlt = [

  [
    // UP
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
  ], 

  // LEFT
  [
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
  ],

  // FRONT
  [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
  ], 

  // RIGHT
  [
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
  ],

  // BACK
  [
    ['r', 'r', 'r'],
    ['r', 'r', 'r'],
    ['r', 'r', 'r'],
  ], 

  // DOWN
  [
    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
  ], 
]

// cube in solved state for reset
const resetCube = [...cubeMatrixAlt]
// the below array will contain the configuration for the cube after face or cube rotation;
const newCube = []

// arrays containing edge pieces for down, middle and up layers (layers 1, 2 and 3)
/*
for the up and down layer array subarrays, the zero index element represents the edge facet that is on the 'end' of the layer.  The element at index '1' represents the edge facet that is on the 'side' of the layer

for the mid layer array, the zero index element represents the edge facet on the front or back end of the layer, and the element at index '1' represents the facet on the right or left 
*/

let upLayerEdges = []
let midLayerEdges = []
let downLayerEdges = []

// variable for number of solved cross pieces
let solvedCrossPieces = 0;

// arrays to hold facets for each face
let leftFacetArr = []
let rightFacetArr = []
let frontFacetArr = []
let backFacetArr = []
let upFacetArr = []
let downFacetArr = []
// subarrays for holding facet elements for each face
let facetMainArr  = [leftFacetArr, rightFacetArr, frontFacetArr, backFacetArr, upFacetArr, downFacetArr]

// array for facet class names, each facet has a classname, a string, that includes a spelled out word representing its integer position on the face
const facetsNames = [
  ['zero', 'one', 'two'],
  ['three', 'four', 'five'],
  ['six', 'seven', 'eight']
]

// variables for determining the colour of the facet
let faceColour;
let colourName;

const renderCube = (cube, update, double, doubleFace) =>{
// console.log(cube)
// facetMainArr
// console.log(cube)

  const runRender = (newConfig) =>{

    // on the cube matrix array for each subarray (representing one layer of the cube)
cube.forEach((face, faceIndex) =>{
  // loop through the layer elements
  face.forEach((layer, indexOfLayer) =>{
  
    layer.forEach((facet, indexOfFacet) =>{
  // create a div for each element (which represents a facet on the layer)
  let facetElement = document.createElement('div')
  // create an appropriate classname for the facet, the string on the current position
  let facetClass = 'facet-' + facetsNames[indexOfLayer][indexOfFacet]
  // add facet's classname to the div
  facetElement.setAttribute('class', facetClass)
  
      // get colour character from cube matrix array which corresponds to face array
      faceColour = facet
  
      switch(faceColour){ // switch colour character and assign colour associated with character
        case 'g': colourName = 'green'
        break;
        case 'o': colourName = 'orange'
        break;
        case 'b': colourName = 'blue'
        break;
        case 'r': colourName = 'red'
        break;
        case 'y': colourName = 'yellow'
        break;
        case 'w': colourName = 'white'
        break;
          }
  
     // style the facet and add face colour
     facetElement.style.cssText = `width:50px; height:50px;  border:1px solid black; border-radius:5px; background-color:${colourName}`


     // push facet to face array, unless a new configuration exists then push to the empty array
if(newConfig){

  // first the original facets need removal
  faceElements.forEach(oldFace =>{
    while (oldFace.firstChild) {
      oldFace.removeChild(oldFace.firstChild)
    }
    
       })
    
  newConfig[faceIndex].push(facetElement)
  // on each face element
  faceElements.forEach((face, indexOfFace) =>{
    // find the corresponding group of facets
    newConfig[indexOfFace].forEach((facetMember, indexOfMember) =>{

      // append each facet to the face
      face.append(facetMember)
    })
    
  })

// replace original cube with new configuration
  cubeMatrixAlt = [...cube]

  // arrays recording edge pice positions
  upLayerEdges = [
    [cubeMatrixAlt[0][0][1], cubeMatrixAlt[4][0][1]],// UP-BACK
    [cubeMatrixAlt[0][1][0], cubeMatrixAlt[1][0][1]], // UP-LEFT
    [cubeMatrixAlt[0][2][1], cubeMatrixAlt[2][0][1]], // UP-FRONT
    [cubeMatrixAlt[0][1][2], cubeMatrixAlt[3][0][1]] // UP-RIGHT
  ]
  
  midLayerEdges = [

    [cubeMatrixAlt[4][1][2], cubeMatrixAlt[1][1][0]], // BACK-LEFT
    [cubeMatrixAlt[2][1][0], cubeMatrixAlt[1][1][2]], // FRONT-LEFT
    [cubeMatrixAlt[2][1][2], cubeMatrixAlt[3][1][0]], // FRONT-RIGHT
    [cubeMatrixAlt[4][1][0], cubeMatrixAlt[3][1][2]] // BACK-RIGHT
  ]
  
  downLayerEdges = [
    [cubeMatrixAlt[5][2][1], cubeMatrixAlt[4][2][1]], // DOWN-BACK
    [cubeMatrixAlt[5][1][0], cubeMatrixAlt[1][2][1]], // DOWN-LEFT
    [cubeMatrixAlt[5][0][1], cubeMatrixAlt[2][2][1]], // DOWN-FRONT
    [cubeMatrixAlt[5][1][2], cubeMatrixAlt[3][2][1]] // DOWN-RIGHT
  ]
 
}else{
  facetMainArr[faceIndex].push(facetElement)


// use facetMainArray elements to pupulate cube faces
  // on each face element
  faceElements.forEach((face, indexOfFace) =>{
    // find the corresponding group of facets
    facetMainArr[indexOfFace].forEach((facetMember, indexOfMember) =>{

      // append each facet to the face
      face.append(facetMember)
    })
    
  })

}

  
    })
  
    })
  
  })


  if(double == 'double'){
    switch(doubleFace){
      case 'up': console.log('U2 move')
      upRotate('u2-btnless')
      break;
      case 'down': console.log('D2 move')
      downRotate('d2-btnless')
      break;
      case 'left': console.log('L2 move')
      leftRotate('l2-btnless')
      break;
      case 'right': console.log('R2 move')
      rightRotate('r2-btnless')
      break;
      case 'front': console.log('F2 move')
      frontRotate('f2-btnless')
      break;
      case 'back': console.log('B2 move')
      backRotate('b2-btnless')
      break;
    
    }
      }

  }






  // if this is not the first render then the update argument will have the string value 'update'
  if(update){
setTimeout(() => {
  newArray = [[], [], [], [], [], []]
  runRender(newArray)
}, 50);


  }else{
runRender()
  }





  
}
// when page opens up the cube is rendered in the solved configuration
renderCube(cubeMatrixAlt)


// function for dealing with face turns
function faceRotate(button, double){
switch(button){
case 'u-btn':
case 'u-prime-btn':
  case 'u2-btn':
  upRotate(button, double)
break;
case 'd-btn':
case 'd-prime-btn':
  case 'd2-btn':
  downRotate(button, double)
break;
case 'l-btn':
case 'l-prime-btn':
  case 'l2-btn':
  leftRotate(button, double)
break;
case 'r-btn':
case 'r-prime-btn':
  case 'r2-btn':
  rightRotate(button, double)
break;
case 'f-btn':
case 'f-prime-btn':
  case 'f2-btn':
  frontRotate(button, double)
break;
case 'b-btn':
case 'b-prime-btn':
  case 'b2-btn':
  backRotate(button, double)
break;
}
}



// U or U' move
function upRotate(button, double){
console.log(button)
switch(button){
  case 'u-btn': // execute default move - 
  // left, front, right and back have last layer, row 1 rotated. 
  // row 'A' receives row'B' facets - left recieves back, front receives left, right receives front, and back receives right; // everything on the turned face needs to be changed (aside from center piece which is at index position '4')
case 'u2-btn': // request for a double face rotation i.e 'U2'
case 'u2-btnless':
let newUp = [

  [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][0][0]], 
  [cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][0][1]], 
  [cubeMatrixAlt[0][2][2], cubeMatrixAlt[0][1][2], cubeMatrixAlt[0][0][2]]


]


let  newLeft = [
  cubeMatrixAlt[2][0],
  cubeMatrixAlt[1][1],
  cubeMatrixAlt[1][2]
]

let  newFront = [
  cubeMatrixAlt[3][0],
  cubeMatrixAlt[2][1],
  cubeMatrixAlt[2][2]
]

let  newRight = [
  cubeMatrixAlt[4][0],
  cubeMatrixAlt[3][1],
  cubeMatrixAlt[3][2]
]


let  newBack = [
  cubeMatrixAlt[1][0],
  cubeMatrixAlt[4][1],
  cubeMatrixAlt[4][2]
]


let newConfig = [
newUp,
newLeft,
newFront, 
newRight, 
newBack, 
cubeMatrixAlt[5]
]
// if double rotation button pressed use relevant double rotation output
// button == 'u-btn'? paraOutput.textContent += ' U - ': paraOutput.textContent += ' U2 - ';
// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only

if(button == 'u-btn'){paraOutput.textContent += ' U - '}
if(button == 'u2-btn'){paraOutput.textContent += ' U2 - '}

double == 'double'? renderCube(newConfig, 'update', double, 'up'): renderCube(newConfig, 'update')
break;

    case 'u-prime-btn': // execute prime move
    let newUpPrime = [


      [cubeMatrixAlt[0][0][2], cubeMatrixAlt[0][1][2], cubeMatrixAlt[0][2][2]], 
      [cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][2][1]], 
      [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][2][0]]
    
    ]
    
    
    let newLeftPrime = [
      cubeMatrixAlt[4][0],
      cubeMatrixAlt[1][1],
      cubeMatrixAlt[1][2]
    ]
    
    let newFrontPrime = [
      cubeMatrixAlt[1][0],
      cubeMatrixAlt[2][1],
      cubeMatrixAlt[2][2]
    ]
    
    let newRightPrime = [
      cubeMatrixAlt[2][0],
      cubeMatrixAlt[3][1],
      cubeMatrixAlt[3][2]
    ]
    
    
    let newBackPrime = [
      cubeMatrixAlt[3][0],
      cubeMatrixAlt[4][1],
      cubeMatrixAlt[4][2]
    ]
    
    
    let newConfigPrime = [
    newUpPrime,
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    cubeMatrixAlt[5]
    ]
    paraOutput.textContent += ' U\' - '

    renderCube(newConfigPrime, 'update')
    
break;
}
}


// D or D' move
function downRotate(button, double){

  console.log('down layer rotated')
  switch(button){
      case 'd-btn': // down default
      case 'd2-btn':
        case 'd2-btnless':

      let newLeft = [
        cubeMatrixAlt[1][0],
        cubeMatrixAlt[1][1],
        cubeMatrixAlt[4][2]
      ]
      
      let newFront = [
        cubeMatrixAlt[2][0],
        cubeMatrixAlt[2][1],
        cubeMatrixAlt[1][2]
      ]
      
      let newRight = [
        cubeMatrixAlt[3][0],
        cubeMatrixAlt[3][1],
        cubeMatrixAlt[2][2]
      ]
      
      
      let newBack = [
        cubeMatrixAlt[4][0],
        cubeMatrixAlt[4][1],
        cubeMatrixAlt[3][2]
      ]
      
      let newDown = [
        [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][0][0]], 
        [cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][0][1]], 
        [cubeMatrixAlt[5][2][2], cubeMatrixAlt[5][1][2], cubeMatrixAlt[5][0][2]]
      
      ]
      
      let newConfig = [
      cubeMatrixAlt[0],
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
      ]

      // shortcut to render output to match rotation type
      // button == 'd-btn'? paraOutput.textContent += ' D - ': paraOutput.textContent += ' D2 - '
// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only

if(button == 'd-btn'){paraOutput.textContent += ' D - '}
if(button == 'd2-btn'){paraOutput.textContent += ' D2 - '}

double == 'double'? renderCube(newConfig, 'update', double, 'down'): renderCube(newConfig, 'update')
break;

    case 'd-prime-btn': // down prime

    let newLeftPrime = [
      cubeMatrixAlt[1][0],
      cubeMatrixAlt[1][1],
      cubeMatrixAlt[2][2]
    ]
    
    let newFrontPrime = [
      cubeMatrixAlt[2][0],
      cubeMatrixAlt[2][1],
      cubeMatrixAlt[3][2]
    ]
    
    let newRightPrime = [
      cubeMatrixAlt[3][0],
      cubeMatrixAlt[3][1],
      cubeMatrixAlt[4][2]
    ]
    
    
    let newBackPrime = [
      cubeMatrixAlt[4][0],
      cubeMatrixAlt[4][1],
      cubeMatrixAlt[1][2]
    ]
    
    let newDownPrime = [
      [cubeMatrixAlt[5][0][2], cubeMatrixAlt[5][1][2], cubeMatrixAlt[5][2][2]], 
      [cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][2][1]], 
      [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][2][0]]
    
    ]
    
    let newConfigPrime = [
    cubeMatrixAlt[0],
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    newDownPrime

    ]
    paraOutput.textContent += ' D\' - '

    renderCube(newConfigPrime, 'update')
    break;
  }
}


// L or L' move
function leftRotate(button, double){
  console.log('left layer rotated')

  switch(button){
    case 'l-btn':
      case 'l2-btn':
        case 'l2-btnless':

    let newUp = [
      [cubeMatrixAlt[4][2][2], cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][0][2]], 
      [cubeMatrixAlt[4][1][2], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][1][2]], 
      [cubeMatrixAlt[4][0][2], cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][2][2]]
     ]


      let newLeft = [
        [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][0][0]], 
        [cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][0][1]], 
        [cubeMatrixAlt[1][2][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][0][2]]
      ]

      let newFront = [
  [cubeMatrixAlt[0][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][0][2]], 
  [cubeMatrixAlt[0][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][1][2]], 
  [cubeMatrixAlt[0][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][2][2]]
       ]
      
// right remains unchanged
      let newRight = cubeMatrixAlt[3]
      
      
      let newBack = [
        [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][0][1], cubeMatrixAlt[5][2][0]], 
        [cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][1][1], cubeMatrixAlt[5][1][0]], 
        [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][2][1], cubeMatrixAlt[5][0][0]]
      ]
      
      let newDown = [
        [cubeMatrixAlt[2][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][0][2]], 
        [cubeMatrixAlt[2][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][1][2]], 
        [cubeMatrixAlt[2][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][2][2]]
      
      ]


      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      // button == 'l-btn'? paraOutput.textContent += ' L - ': paraOutput.textContent += ' L2 - '

      if(button == 'l-btn'){paraOutput.textContent += ' L - '}
if(button == 'l2-btn'){paraOutput.textContent += ' L2 - '}


// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'left'): renderCube(newConfig, 'update')
      break;
 case 'l-prime-btn':
  
 let newUpPrime = [
  [cubeMatrixAlt[2][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][0][2]], 
  [cubeMatrixAlt[2][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][1][2]], 
  [cubeMatrixAlt[2][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][2][2]]
 ]

// left remains unchanged
  let newLeftPrime = [
    [cubeMatrixAlt[1][0][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][2][2]], 
    [cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][2][1]], 
    [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][2][0]]
  ]

  let newFrontPrime = [
[cubeMatrixAlt[5][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][0][2]], 
[cubeMatrixAlt[5][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][1][2]], 
[cubeMatrixAlt[5][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][2][2]]
  ]
  
  // right face remains unchanged
  let newRightPrime = cubeMatrixAlt[3]
  
  
  let newBackPrime = [
    [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][0][1], cubeMatrixAlt[0][2][0]], 
    [cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][1][1], cubeMatrixAlt[0][1][0]], 
    [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][2][1], cubeMatrixAlt[0][0][0]]
  ]
  
  let newDownPrime = [
    [cubeMatrixAlt[4][2][2], cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][0][2]], 
    [cubeMatrixAlt[4][1][2], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][1][2]], 
    [cubeMatrixAlt[4][0][2], cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][2][2]]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]
  paraOutput.textContent += ' L\' - '


  renderCube(newConfigPrime, 'update')
}
}


// R or R' move
function rightRotate(button, double){
  console.log('right layer rotated')

  switch(button){
      case 'r-btn':
        case 'r2-btn':
          case 'r2-btnless':

      let newUp = [
        [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[2][0][2]], 
        [cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[2][1][2]], 
        [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[2][2][2]]
       ]

// left remains unchanged
        let newLeft = cubeMatrixAlt[1]

        let newFront = [
    [cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[5][0][2]], 
    [cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[5][1][2]], 
    [cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[5][2][2]]
        ]
        
        let newRight = [
  [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][0][0]], 
  [cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][0][1]], 
  [cubeMatrixAlt[3][2][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][0][2]]

        ]
        
        
        let newBack = [
          [cubeMatrixAlt[0][2][2], cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][0][2]], 
          [cubeMatrixAlt[0][1][2], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][1][2]], 
          [cubeMatrixAlt[0][0][2], cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][2][2]]
        ]
        
        let newDown = [
          [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[4][2][0]], 
          [cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[4][1][0]], 
          [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[4][0][0]]
        
        ]


        
        let newConfig = [
        newUp,
        newLeft,
        newFront, 
        newRight, 
        newBack, 
        newDown
    
        ]
      // shortcut to render output to match rotation type
      if(button == 'r-btn'){paraOutput.textContent += ' R - '}
if(button == 'r2-btn'){paraOutput.textContent += ' R2 - '}
        // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'right'): renderCube(newConfig, 'update')

        break;
   case 'r-prime-btn':
    
   let newUpPrime = [
    [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[4][2][0]], 
    [cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[4][1][0]], 
    [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[4][0][0]]
   ]

// left remains unchanged
    let newLeftPrime = cubeMatrixAlt[1]

    let newFrontPrime = [
[cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[0][0][2]], 
[cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[0][1][2]], 
[cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[0][2][2]]
    ]
    
    let newRightPrime = [
      [cubeMatrixAlt[3][0][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][2][2]], 
      [cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][2][1]], 
      [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][2][0]]

    ]
    
    
    let newBackPrime = [
      [cubeMatrixAlt[5][2][2], cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][0][2]], 
      [cubeMatrixAlt[5][1][2], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][1][2]], 
      [cubeMatrixAlt[5][0][2], cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][2][2]]
    ]
    
    let newDownPrime = [
      [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[2][0][2]], 
      [cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[2][1][2]], 
      [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[2][2][2]]
    
    ]


    
    let newConfigPrime = [
    newUpPrime,
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    newDownPrime

    ]
    paraOutput.textContent += ' R\' - '

    renderCube(newConfigPrime, 'update')
}
}


// F or F' move
function frontRotate(button, double){
  console.log('front layer rotated')

  switch(button){
    case 'f-btn':
      case 'f2-btn':
case 'f2-btnless':
    let  newUp = [
      cubeMatrixAlt[0][0],
      cubeMatrixAlt[0][1],
      [cubeMatrixAlt[1][2][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][0][2]]
    ]
    
    let  newDown = [
      [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][0][0]],
      cubeMatrixAlt[5][1],
      cubeMatrixAlt[5][2]
    ]

    let newRight = [
      [cubeMatrixAlt[0][2][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][0][2]], 
      [cubeMatrixAlt[0][2][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][1][2]], 
      [cubeMatrixAlt[0][2][2], cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][2][2]]
    ]

      let newLeft = [
        [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[5][0][0]], 
        [cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][1][1], cubeMatrixAlt[5][0][1]], 
        [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[5][0][2]]
      ]

      let newFront = [
        [cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][0][0]], 
        [cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][0][1]], 
        [cubeMatrixAlt[2][2][2], cubeMatrixAlt[2][1][2], cubeMatrixAlt[2][0][2]]
       ]
      
// back remains unchanged
  let newBack = cubeMatrixAlt[4]
      



      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      if(button == 'f-btn'){paraOutput.textContent += ' F - '}
      if(button == 'f2-btn'){paraOutput.textContent += ' F2 - '}      // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'front'): renderCube(newConfig, 'update')

      break;
 case 'f-prime-btn':
  
 let newUpPrime = [
  cubeMatrixAlt[0][0],
  cubeMatrixAlt[0][1],
  [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][2][0]]

 ]

// left remains unchanged
  let newLeftPrime = [
    [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[0][2][2]], 
    [cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][1][1], cubeMatrixAlt[0][2][1]], 
    [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[0][2][0]]
  ]

  let newFrontPrime = [
    [cubeMatrixAlt[2][0][2], cubeMatrixAlt[2][1][2], cubeMatrixAlt[2][2][2]], 
    [cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][2][1]], 
    [cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][2][0]]
  ]
  
  let newRightPrime = [
    [cubeMatrixAlt[5][0][2], cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][0][2]], 
    [cubeMatrixAlt[5][0][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][1][2]], 
    [cubeMatrixAlt[5][0][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][2][2]]
  ]
  
// back remains unchanged
let newBackPrime = cubeMatrixAlt[4]

  let newDownPrime = [
    [cubeMatrixAlt[1][0][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][2][2]],
    cubeMatrixAlt[5][1],
    cubeMatrixAlt[5][2]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]
  paraOutput.textContent += ' F\' - '

  renderCube(newConfigPrime, 'update')
}
}


// B or B' move
function backRotate(button, double){
  console.log('back layer rotated')

  switch(button){
    case 'b-btn':
      case 'b2-btn':
case 'b2-btnless':
    let  newUp = [
      [cubeMatrixAlt[3][0][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][2][2]],
      cubeMatrixAlt[0][1],
      cubeMatrixAlt[0][2],

    ]
    
    let  newDown = [
      cubeMatrixAlt[5][0],
      cubeMatrixAlt[5][1],
      [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][2][0]]
    ]

    let newRight = [
      [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[5][2][2]], 
      [cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][1][1], cubeMatrixAlt[5][2][1]], 
      [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[5][2][0]]
    ]

      let newLeft = [
        [cubeMatrixAlt[0][0][2], cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][0][2]], 
        [cubeMatrixAlt[0][0][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][1][2]], 
        [cubeMatrixAlt[0][0][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][2][2]]
      ]

      let newBack = [
        [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][0][0]], 
        [cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][0][1]], 
        [cubeMatrixAlt[4][2][2], cubeMatrixAlt[4][1][2], cubeMatrixAlt[4][0][2]]
      ]
// front remains unchanged
      let newFront = cubeMatrixAlt[2]

      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      if(button == 'b-btn'){paraOutput.textContent += ' B - '}
      if(button == 'b2-btn'){paraOutput.textContent += ' B2 - '}
      // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'back'): renderCube(newConfig, 'update')

      break;
 case 'b-prime-btn':
  
 let newUpPrime = [
  [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][0][0]],
  cubeMatrixAlt[0][1],
  cubeMatrixAlt[0][2]
 ]


  let newLeftPrime = [
    [cubeMatrixAlt[5][2][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][0][2]], 
    [cubeMatrixAlt[5][2][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][1][2]], 
    [cubeMatrixAlt[5][2][2], cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][2][2]]
  ]
  // front remains unchanged
  let newFrontPrime = [...cubeMatrixAlt[2]]

  let newRightPrime = [
    [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[0][0][0]], 
    [cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][1][1], cubeMatrixAlt[0][0][1]], 
    [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[0][0][2]]
  ]
  

let newBackPrime = [
  [cubeMatrixAlt[4][0][2], cubeMatrixAlt[4][1][2], cubeMatrixAlt[4][2][2]], 
  [cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][2][1]], 
  [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][2][0]]
]

  let newDownPrime = [

    cubeMatrixAlt[5][0],
    cubeMatrixAlt[5][1],
    [cubeMatrixAlt[3][2][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][0][2]]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]

  console.log(newConfigPrime)
  paraOutput.textContent += ' B\' - '

  renderCube(newConfigPrime, 'update')
}}


const changeCubeState = (clickedButton) =>{
  let stateButton = clickedButton
  
  switch(stateButton){
    case 'scramble': console.log('scrambling cube.....')
    break;
    case 'solve': console.log('solving cube...')
    checkCrossDownLayer()
    break;
    default: // reset button was clicked
    paraOutput.textContent = ''
    renderCube(resetCube, 'update')

  }
}

// CUBE STATE BUTTONS EVENT LISTENER
cubeStateBtns.forEach(button =>{
  button.addEventListener('click', e =>{
    changeCubeState(e.target.id)
})
  })

  // function to input scramles.  Will not allow manual input, since there is too much room for error; so will continue to use button elements for moving the cube manually which will probably not be needed eventually.  

  // maybe disallow letters that are not 'L R U D B F' and their primes 


  //temporary arrays to hold correctly (and incorrectly) oriented cross pieces on the first layer
  let orientedCrossEdgeArray = []
let notOrientedCrossEdgeArray = []
  // temporary array for incorrectly oriented cross pieces on the first layer; this can be used if no correctly oriented pieces were found, or if correctly oriented pieces have been permuted correctly
  function checkCrossDownLayer(){
    orientedCrossEdgeArray = []

          // variables for correctly (and incorrectly) oriented cross pieces on the first layer
      let orientedCrossPieces = 0;
// variable for the number name of the slot where the cross piece sits
let crossPiecePosition; 

          
    // check if there are any correctly oriented white cross pieces on the bottom layer
    downLayerEdges.forEach((edge, index) =>{
      console.log(edge)
      if(edge[0] == 'w'){
        // increment the oriented pieces variable
orientedCrossPieces ++;

          // index position of subarray referencing the piece is used to name the position of the cross piece
          if(index === 0){
            crossPiecePosition = 'down-back'
          }else if(index === 1){
            crossPiecePosition = 'down-left'
          }else if(index === 2){
            crossPiecePosition = 'down-front'
          }else{
            crossPiecePosition = 'down-right'
          }


// create an object properties of; index of rotation of the pice, the details of the cross piece edges, and the position of rotation in words. 
orientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition
})
      }
    })




    console.log(orientedCrossEdgeArray)
// if one or more correctly oriented cross piece exists on the first layer check if the pieces are permuted corectly relative to each other
    if(orientedCrossPieces > 0){
      console.log(`correctly oriented cross pieces: ${orientedCrossPieces}  `)
      console.log(orientedCrossEdgeArray)

      switch(orientedCrossPieces){
        case 1: // since only one piece is oriented correctly, it can stay as is, and other pieces that are added to the first layer can be compared with this piece to see if they are permuted correctly relative to each other; move onto next step. check if there are non-oriented cross pieces on the first layer
        console.log('only one correctly oriented piece in the first layer, so does not need to be permuted.')
        solvedCrossPieces ++
checkNonOrientedCrossPieces()
        break;
        case 2: // if two cross pieces are correctly oriented

      // GET SIDE-COLOR OF FIRST CROSS PIECE
        let color1 = orientedCrossEdgeArray[0]['cross_piece'][1]
      // GET SIDE-COLOR OF SECOND CROSS PIECE
        let color2 = orientedCrossEdgeArray[1]['cross_piece'][1]
        // get in-layer index of first piece
        let indexColor1 = orientedCrossEdgeArray[0]['index_in_layer'];
        // get in-layer index of second piece
        let indexColor2 = orientedCrossEdgeArray[1]['index_in_layer'];
        // get the name of the second edge piece; the edge name will be sent as a parameter to the  permute function, which will switch the name in order to determine which side-face to turn in order to manipulate the piece
        let edgeName = orientedCrossEdgeArray[1]['piece_position']

        

if(color1  == 'o'){ // colour is ORANGE
// DETERMINE THE COLOUR OF THE SECOND PIECE
if(color2 == 'g'){ // colour 2 is 'GREEN'
  permuteTwoCrossEdges(indexColor1, indexColor2, 3, edgeName)
}else if(color2 == 'r'){ // colour is RED 
  permuteTwoCrossEdges(indexColor1, indexColor2, 2, edgeName)
}else{ // the remaining colour must be BLUE
  permuteTwoCrossEdges(indexColor1, indexColor2, 1, edgeName)
          }
}else if(color1 == 'b'){ // colour is RED
  // DETERMINE THE COLOUR OF THE SECOND PIECE
  if(color2 == 'o'){ // colour 2 is 'ORANGE'
    permuteTwoCrossEdges(indexColor1, indexColor2, 3, edgeName)
  }else if(color2 == 'g'){ // colour is GREEN 
    permuteTwoCrossEdges(indexColor1, indexColor2, 2, edgeName)
  }else{ // the remaining colour must be RED
    permuteTwoCrossEdges(indexColor1, indexColor2, 1, edgeName)
  }
}else if(color1 == 'r'){ // colour is RED
  // DETERMINE THE COLOUR OF THE SECOND PIECE
  if(color2 == 'b'){ // colour 2 is 'BLUE'
    permuteTwoCrossEdges(indexColor1, indexColor2, 3, edgeName)
  }else if(color2 == 'o'){ // colour is ORANGE 
    permuteTwoCrossEdges(indexColor1, indexColor2, 2, edgeName)
  }else{ // the remaining colour must be GREEN
    permuteTwoCrossEdges(indexColor1, indexColor2, 1, edgeName)
  }
}else{// colour must be GREEN
  // DETERMINE THE COLOUR OF THE SECOND PIECE
  if(color2 == 'r'){ // colour 2 is 'RED'
    permuteTwoCrossEdges(indexColor1, indexColor2, 3, edgeName)
  }else if(color2 == 'b'){ // colour is BLUE 
    permuteTwoCrossEdges(indexColor1, indexColor2, 2, edgeName)
  }else{ // the remaining colour must be ORANGE
    permuteTwoCrossEdges(indexColor1, indexColor2, 1, edgeName)
  }
}
break;
case 3:
  break;
  case 4:
    break;
I   
    }

}else{
  checkNonOrientedCrossPieces()
}
}

let solvedLayer1Cubies = []
let solvedLayer2Cubies = []
// PERMUTE 
function permuteTwoCrossEdges(A, B, permuteDistance, edge_name){
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (A + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer to the correct position for insertion of the cross piece from the U-layer

  
  let rawRotation;
  if(B === permuted){
    console.log('piece B is correctly permuted')
   // as there are only correctly oriented pieces in the D-layer and they are solved, check for incorrectly oriented cross pieces on the down layer. 
   solvedCrossPieces = 2;
    checkNonOrientedCrossPieces() 
  }else{ // piece B is not permuted correctly relative to piece A: find the absolute distance between the correct permutation position and position of 'B'
rawRotation = permuted - B
console.log(rawRotation)
console.log('piece B is not correctly permuted')

// if the rotation direction is negative
if(rawRotation < 0){
  console.log('piece B is ahead of its correctly permuted position')
//adding 4 to a negative number of rotations gives the required number of forward rotations
  rotationsToPermuted = rawRotation + 4
}else if(rawRotation > 0){ // otherwise the rotation direction is positive
  console.log('piece B is behind its correctly permuted position')

  // otherwise the number of rotations is positive; use the raw rotation value
  rotationsToPermuted = rawRotation
}

// switch the number of rotations to permuted so the down layer can receive the correct number of turns to receive the second piece
// the down layer is timed to occur between the two 'side-face' turns; because the down layer receives the cross piece, it is a given that this is the layer we are turning. On the other hand, the side-face needs to be determined because it could be any one of the four faces vertical faces on the cube. 
switch(rotationsToPermuted){
case 1: // just one forward rotation so just the d-btn string
console.log('seeing what happens on line 1246 when variable is assigned a function in this case down button')

setTimeout(() => {
  downLayerRotations =  downRotate('d-btn')
}, 3200);

break;
case 2:// a double rotation
setTimeout(() => {
  downLayerRotations = downRotate('d2-btnless', 'double')
}, 3200);

break;
case 3: // three rotations can be achieved by doing one prime rotation of the same face
setTimeout(() => {
  downLayerRotations = downRotate('d-prime-btn')
}, 3200);

break;
}

// switch edge_name parameter to determine which edge needs to be rotated. 
switch(edge_name){
  case 'down-right': //  double rotate the right face
// first move
  setTimeout(() => {
    rightRotate('r2-btnless', 'double')
  }, 1600);
// third move
  setTimeout(() => {
    rightRotate('r2-btnless', 'double')
  }, 4800);

  // check result
  setTimeout(() => {
    updateLayer1CrossEdges()
    checkNonOrientedCrossPieces()
  }, 5200);
    break;
    case 'down-left': // double rotate the left face
// timeout for first move
    setTimeout(() => {
      leftRotate('l2-btnless', 'double')
    }, 1600);
// timeout for third move
    setTimeout(() => {
      leftRotate('l2-btnless', 'double')
    }, 4800);

    // check result
    setTimeout(() => { // recreate the array containing oriented cross pieces on the down layer so that the contents can be used later if there are non oriented cross pieces on the layer or if there are cross pieces on other layers. 
      updateLayer1CrossEdges()
      checkNonOrientedCrossPieces()
    }, 5200);
      break;
      case 'down-front': // PIECE IS ON FRONT FACE
      console.log('case: down-front')
      // first move
      setTimeout(() => {
        frontRotate('f2-btnless', 'double')
      }, 1600);
// third move
   setTimeout(() => {
    frontRotate('f2-btnless', 'double')
   }, 4800);
   // check result
   setTimeout(() => {
    updateLayer1CrossEdges()
    checkNonOrientedCrossPieces()
  }, 5200);
        break;
        case 'down-back': // double rotate the back face
// first smove
        setTimeout(() => {
          backRotate('b2-btnless', 'double')          
        }, 1600);
// third move
        setTimeout(() => {
          backRotate('b2-btnless', 'double')         
        }, 4800);
        // check result
setTimeout(() => {
  updateLayer1CrossEdges()
  checkNonOrientedCrossPieces()
}, 5200);
          break;
}


solvedCrossPieces = 2
checkNonOrientedCrossPieces() 

  }

}




function checkResult(){

}

function checkNonOrientedCrossPieces(){
  console.log('checking for first layer cross pieces oriented incorrectly')

  let notOrientedCrossPieces = 0;

    // check for incorrectly oriented cross pieces on the first layer
    downLayerEdges.forEach((edge, index) =>{
      if(edge[1] == 'w'){
        // if either of the edge's facets is white incriment the cross pieces
  notOrientedCrossPieces ++;
  notOrientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge,
  })
      }
    });


    // if the pieces do exist
    if(notOrientedCrossPieces > 0){
console.log(` there are ${notOrientedCrossPieces} incorrectly oriented cross pieces in layer 1`)
console.log(notOrientedCrossEdgeArray)

    }else{

      console.log('there are no incorrectly oriented cross pieces in layer 1: checking middle layer for cross pieces....')
            checkCrossPieceMidLayer()
    }

}

function updateLayer1CrossEdges(){
  // clear the array containing the former
  orientedCrossEdgeArray = []
  let orientedCrossPieces = 0;
    // check if there are any correctly oriented white cross pieces on the bottom layer
    downLayerEdges.forEach((edge, index) =>{
      console.log(edge)
      if(edge[0] == 'w'){
        // increment the oriented pieces variable
orientedCrossPieces ++;

          // index position of subarray referencing the piece is used to name the position of the cross piece
          if(index === 0){
            crossPiecePosition = 'down-back'
          }else if(index === 1){
            crossPiecePosition = 'down-left'
          }else if(index === 2){
            crossPiecePosition = 'down-front'
          }else{
            crossPiecePosition = 'down-right'
          }


// create an object properties of; index of rotation of the pice, the details of the cross piece edges, and the position of rotation in words. 
orientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition
})
      }
    })
}


// array for cross edges on middle layer
let midLayerCrossEdgesArray = []


// PLACING CROSS PIECES FROM THE MID LAYER TO THE DOWN LAYER (PERMUTED)
function checkCrossPieceMidLayer(){
midLayerCrossEdgesArray = []
// variable for the number of oriented cross pieces
let crossPieces = 0;
// variable for the number name of the slot where the cross piece sits
let crossPiecePosition; 

// get the  index of the white piece in the cross_piece array
let edgePieceWhiteFacetIndex;
// variable for holding the indexes (in an array) of white and non-white cross piece facets
let facetIndexes;
      // check if there are any white cross pieces on the bottom layer
      midLayerEdges.forEach((edge, index) =>{
        console.log(edge)


        if( edge[0] == 'w'|| edge[1] == 'w'){
          // if either of the edge's facets is white incriment the cross pieces

                    // index position of subarray referencing the piece is used to name the position of the cross piece
                    if(index === 0){
                      crossPiecePosition = ['back', 'left']
                      facetIndexes = [0, 1]
                    }else if(index === 1){
                      crossPiecePosition = ['front', 'left']
                      facetIndexes = [2, 1]
                    }else if(index === 2){
                      crossPiecePosition = ['front', 'right']
                      facetIndexes = [2, 3]
                    }else{
                      crossPiecePosition = ['back', 'right']
                      facetIndexes = [0, 3]
                    }


  crossPieces ++;

  midLayerCrossEdgesArray.push({
    'index': index,
    'facet_indexes': facetIndexes,
    'cross_piece': edge, 
    'piece_position':crossPiecePosition
  })
        }
      })
// if there are cross edge pieces on the middle layer
      if(crossPieces > 0){
        console.log(`cross pieces on middle layer: ${crossPieces}`)

       if(orientedCrossEdgeArray.length > 0){ // if there is at least one oriented cross edge in the down layer
          // then use the first instance as a master from which to calculate the intended permuted index of the edge piece found in the mid layer; note that if at this juncture there are oriented cross edge pieces in the down layer, they will have been permuted correctly relative to each other, since, that occurs BEFORE a check for non-oriented cross pieces on the down layer, and a check for cross pieces sitting in the mid layer. This means that it doesn't really matter which down layer cross piece is used as a guide, but for uniformity the first instance is used here. 

// get the main colour; its position will be used as a reference for all other positions. 
let masterEdgePiece = orientedCrossEdgeArray[0]
let childCrossEdge = midLayerCrossEdgesArray[0]
console.log('childCrossEdge')
console.log(childCrossEdge)
console.log('masterEdgePiece')
console.log(masterEdgePiece)

// variable for colour of nonn-white facet
let childColor;
// variable for index colour facet
let childIndex;
// variable for the colour of non-white facet of the cross piece on the down layer
let masterColor  = masterEdgePiece['cross_piece'][1]
// variable for the index of non-white facet (i.e. the index of the side-face it sits on)
let masterIndex = masterEdgePiece['index_in_layer']
// index of veritcal of the cube where the edge piece sits on the mid layer, the index refers to one of the vertical edges, BL, FL, FR and BR
let vertical_edge_index = childCrossEdge['index']


// give values of colour and index of non-white facet on the mid layer cross piece
if(childCrossEdge['cross_piece'][0] == 'w'){
// set edge piece white facet index
edgePieceWhiteFacetIndex = 0;
  // the child color is used to figure out how many rotations from the master the child piece needs to be
  childColor = childCrossEdge['cross_piece'][1]
  // child index gives you the face to be turned,
  childIndex = childCrossEdge['facet_indexes'][1]


}else{
  childColor = childCrossEdge['cross_piece'][0]
  childIndex = childCrossEdge['facet_indexes'][0]
  // set edge piece white facet index
  edgePieceWhiteFacetIndex = 1;
}



// show child colour
console.log('childColor')
console.log(childColor)
// show child index
console.log('childIndex')
console.log(childIndex)
// show master colour
console.log('masterColor')
console.log(masterColor)
// show master index
console.log('masterIndex')
console.log(masterIndex)


// FIRST work out the intended index of the permuted piece; using the relative distance from the master piece index. 
if(masterColor  == 'o'){ // colour is ORANGE
  // DETERMINE THE COLOUR OF THE SECOND PIECE
  if(childColor == 'g'){ // colour 2 is 'GREEN'
    placeMidLayerCrossPiece(masterIndex, childIndex, 3, vertical_edge_index, edgePieceWhiteFacetIndex)
  }else if(childColor == 'r'){ // colour is RED 
    placeMidLayerCrossPiece(masterIndex, childIndex, 2, vertical_edge_index, edgePieceWhiteFacetIndex)
  }else{ // the remaining colour must be BLUE
    placeMidLayerCrossPiece(masterIndex, childIndex, 1, vertical_edge_index, edgePieceWhiteFacetIndex)
            }
  }else if(masterColor == 'b'){ // colour is RED
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'o'){ // colour 2 is 'ORANGE'
      placeMidLayerCrossPiece(masterIndex, childIndex, 3, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else if(childColor == 'g'){ // colour is GREEN 
      placeMidLayerCrossPiece(masterIndex, childIndex, 2, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else{ // the remaining colour must be RED
      placeMidLayerCrossPiece(masterIndex, childIndex, 1, vertical_edge_index, edgePieceWhiteFacetIndex)
    }
  }else if(masterColor == 'r'){ // colour is RED
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'b'){ // colour 2 is 'BLUE'
      placeMidLayerCrossPiece(masterIndex, childIndex, 3, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else if(childColor == 'o'){ // colour is ORANGE 
      placeMidLayerCrossPiece(masterIndex, childIndex, 2, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else{ // the remaining colour must be GREEN
      placeMidLayerCrossPiece(masterIndex, childIndex, 1, vertical_edge_index, edgePieceWhiteFacetIndex)
    }
  }else{// colour must be GREEN
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'r'){ // colour 2 is 'RED'
      placeMidLayerCrossPiece(masterIndex, childIndex, 3, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else if(childColor == 'b'){ // colour is BLUE 
      placeMidLayerCrossPiece(masterIndex, childIndex, 2, vertical_edge_index, edgePieceWhiteFacetIndex)
    }else{ // the remaining colour must be ORANGE
      placeMidLayerCrossPiece(masterIndex, childIndex, 1, vertical_edge_index, edgePieceWhiteFacetIndex)
    }
  }
        }else{ // there are no correctly oriented edge pices in the down layer so the first cross edge piece in the mid layer can be rotated into place on the down layer. 
        }
        // the next step would be to use a combination of first layer edges, and the piece in the mid layer edges array to work out how to place the mid layer cross piece into the down layer. 

        // for each piece you need to find out where it belongs on the first layer, and calculate the distance to the correct spot, then turn the down layer, and insert the piece. 
      }else{
        console.log('there are no cross pieces on the middle layer')
checkCrossPiecesLastLayer()
      }

}

// PLACING MID LAYER CROSS PIECES INTO DOWN LAYER
function placeMidLayerCrossPiece(A, B, permuteDistance, verticalEdgeIndex, whiteFacetEdgeIndex){
console.log('whiteFacetEdgeIndex')
console.log(whiteFacetEdgeIndex)
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (A + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer to the correct position for insertion of the cross piece from the U-layer
 let rawRotation;
  if(B === permuted){
    console.log('piece B is correctly permuted')
    console.log('index of B')
    console.log(B)

    console.log('index of permuted')
    console.log(permuted)
   // then the sits in the correct position to be slotted into place on the down layer. Given that we already have the index for the face that the color facet sits on, once you know the corner of the edge piece, then it becomes obvious where the white facit is and that will determine how the face is turned. 
   setTimeout(() => {
    switch(verticalEdgeIndex){
      case 0:
        if(B === 1){
          leftRotate('l-prime-btn')
        }else{
          backRotate('b-btn')
        }
        break;
        case 1:
          if(B === 1){
            leftRotate('l-btn')
          }else{
            frontRotate('f-prime-btn')
          }
          break;
          case 2:
            if(B === 3){
              rightRotate('r-prime-btn')
            }else{
              frontRotate('f-btn')
            }
            break;
            default:
              if(B === 3){
                rightRotate('r-btn')
              }else{
                backRotate('b-prime-btn')
              }
  
     }
   }, 1600);
 
    
  
  }else{ // piece B is not permuted correctly relative to piece A: find the absolute distance between the correct permutation position and position of 'B'
rawRotation = permuted - B

// if the rotation direction is negative
if(rawRotation < 0){
  console.log('piece B is ahead of its correctly permuted position')
//adding 4 to a negative number of rotations gives the required number of forward rotations
  rotationsToPermuted = rawRotation + 4
}else if(rawRotation > 0){ // otherwise the rotation direction is positive
  console.log('piece B is behind its correctly permuted position')

  // otherwise the number of rotations is positive; use the raw rotation value
  rotationsToPermuted = rawRotation
}


// switch the number of rotations to permuted so the down layer can receive the correct number of turns to receive the second piece
// the down layer is timed to occur between the two 'side-face' turns; because the down layer receives the cross piece, it is a given that this is the layer we are turning. On the other hand, the side-face needs to be determined because it could be any one of the four faces vertical faces on the cube. 
switch(rotationsToPermuted){
case 1: // just one forward rotation so just the d-btn string
console.log('seeing what happens on line 1246 when variable is assigned a function in this case down button')

setTimeout(() => { // single rotation of down layer
  downLayerRotations =  downRotate('d-btn')
}, 1600);

break;
case 2:// a double rotation of down layer
setTimeout(() => {
  downLayerRotations = downRotate('d2-btnless', 'double')
}, 1600);

break;
case 3: // single prime rotation of down layer
setTimeout(() => {
  downLayerRotations = downRotate('d-prime-btn')
}, 1600);

break;
}


setTimeout(() => {
  // check which vertical corner of the cube the edge piece sits on; and determine whether which side of the corner needs to turn in order to insert the cross piece into the down layer: this needs to be done AFTER the down layer has been turned to the correct position so that it can receive the cross piece from the mid layer

  // CHECK WHITE FACET EDGE INDEX
  console.log('whiteFacetEdgeIndex')
  console.log(whiteFacetEdgeIndex)

  //
switch(verticalEdgeIndex){
  case 0: // vertical corner is back-left
    if(whiteFacetEdgeIndex === 0){
      leftRotate('l-prime-btn')
      console.log('L-PRIME MOVE')
    }else{
      backRotate('b-btn')
      console.log('B MOVE')
    }
    break;
    case 1:
      if(whiteFacetEdgeIndex === 0){
        leftRotate('l-btn')
        console.log('L MOVE')
      }else{
        frontRotate('f-prime-btn')
        console.log('F-PRIME MOVE')
      }
      break;
      case 2:
        if(whiteFacetEdgeIndex === 0){
          rightRotate('r-prime-btn')
          console.log('R-PRIME MOVE')
        }else{
          frontRotate('f-btn')
          console.log('F MOVE')
        } 
        break;
        default:
          if(whiteFacetEdgeIndex === 0){
            rightRotate('r-btn')
            console.log('R MOVE')
          }else{
            backRotate('b-prime-btn')
            console.log('B-PRIME MOVE')
          } 
          

}
checkCrossPiecesLastLayer()

}, 4000);




  }
}





// array for cross edges on middle layer
let lastLayerCrossEdgesArray = []

function checkCrossPiecesLastLayer(){
console.log('checking last layer from white cross edge pieces... ')
// update the down layers
updateLayer1CrossEdges()

upLayerEdges.forEach((edge,index) =>{
  if( edge[0] == 'w'|| edge[1] == 'w'){
    // if either of the edge's facets is white incriment the cross pieces

              // index position of subarray referencing the piece is used to name the position of the cross piece
              if(index === 0){
                crossPiecePosition = ['up', 'back']
                facetIndexes = [0, 2]
              }else if(index === 1){
                crossPiecePosition = ['up', 'left']
                facetIndexes = [0, 1]
              }else if(index === 2){
                crossPiecePosition = ['up', 'front']
                facetIndexes = [0, 2]
              }else{
                crossPiecePosition = ['up', 'right']
                facetIndexes = [0, 3]
              }




lastLayerCrossEdgesArray.push({
'index': index,
'facet_indexes': facetIndexes,
'cross_piece': edge, 
'piece_position':crossPiecePosition
})}
})


// if there are cross pieces on the last layer
if(lastLayerCrossEdgesArray.length > 0){


// if cross pieces exist on the first layer, one of them can be used to calculate where the cross piece in the last layer should go. 
if(orientedCrossEdgeArray.length > 0){
let masterEdgePiece = orientedCrossEdgeArray[0]
// get master color of cross piece in down layer
 let masterColor = masterEdgePiece['cross_piece'][1]
 // get index of master color
 let masterIndex = masterEdgePiece['index_in_layer']
 // variables for child edge, non-white color and index, of cross piece in last layer
 let childColor;
let childIndex;
let childPosition;
 let childCrossEdge = lastLayerCrossEdgesArray[0]['cross_piece']
 if(childCrossEdge[0] == 'w'){ // the white face is facing upward
childColor = childCrossEdge[1] // so the side-face is the color facet
childPosition = lastLayerCrossEdgesArray[0]['piece_position'][1]

 }else{
  childColor = childCrossEdge[0] // color facet is facing upward and white is on the side
  childPosition = lastLayerCrossEdgesArray[0]['piece_position'][0]
 }


// show child colour
console.log('childColor')
console.log(childColor)
// show child index
console.log('childIndex')
console.log(childIndex)
// show master colour
console.log('masterColor')
console.log(masterColor)
// show master index
console.log('masterIndex')
console.log(masterIndex)







 
}
}
}