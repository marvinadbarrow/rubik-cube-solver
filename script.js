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
    [cubeMatrixAlt[2][1][0], cubeMatrixAlt[1][1][2]], // FRONT-LEFT
    [cubeMatrixAlt[4][1][2], cubeMatrixAlt[1][1][0]], // BACK-LEFT
    [cubeMatrixAlt[4][1][0], cubeMatrixAlt[3][1][2]] // BACK-RIGHT
    [cubeMatrixAlt[2][1][2], cubeMatrixAlt[3][1][0]], // FRONT-RIGHT
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
  'piece position':crossPiecePosition
})
      }
    })

    console.log(orientedCrossEdgeArray)
// if one or more correctly oriented cross piece exists on the first layer check if the pieces are permuted corectly relative to each other
    if(orientedCrossPieces > 0){
      console.log(`correctly oriented cross pieces: ${orientedCrossPieces}  `)
      console.log('only one correctly oriented piece in the first layer, so does not need to be permuted.')
      console.log(orientedCrossEdgeArray)

      switch(orientedCrossPieces){
        case 1: // no need to do anything because the piece will be permuted correctly on the cube when ALL cross pieces are permuted correctly relative to one another, so you can then go on to check if there are any incorrectly oriented cross pieces in layer 1. 
checkNonOrientedCrossPieces()
        break;
        case 2: // if two cross pieces are correctly oriented
      
        let colour1 = crossEdgeArray[0].crossPiece[1]
if(colour1  == 'o'){ // colour is ORANGE
          // get non-white colour of second cross piece
          let colour2 = crossEdgeArray[1].crossPiece[1]

          // get index of original piece
          let indexOfO = crossEdgeArray[0].index;
          let cross2Index = crossEdgeArray[1].index;
          // DETERMINE THE COLOUR OF THE SECOND CROSS PIECE
          if(colour2 == 'g'){ // colour 2 is 'GREEN'
            let indexOfG = cross2Index  // 'g' is one index position in front 'o' (clockwise - top down view)
            // create a variable for the index of the position that 'g' needs to be in, so that it is permuted correctly relative to 'o'
            let intendedIndex = (indexOfO + 1)%4 // note: if 'o' is at position 3, then 'g' will be at position (3 + 1)%4 = 4%4 = 0;
            // check if the index of 'g' is as it should be if permuted correctly relative to 'o'
            if(intendedIndex === indexOfG){  // if the index of 'g' and the intended index match, the two pieces are permuted correctly relative to each other; no moves required;
              console.log('orange and green are permuted correctly relative to each other')

            }else{ // relative to piece 'o', piece 'g' is incorrectly permuted
// the first move is trivial, i.e. finding the face on which the intended cross piece sits, and doing a double rotation so that it ends up on the third layer. 
            }
  
          }else if(colour2 == 'r'){ // colour is RED 
            let indexOfR = crossEdgeArray[1].index  // 'b' is two index positions in front 'o'
            // variable for position of correctly permuted 'b'
            let intendedIndex = (indexOfO + 2)%4
        // check if the index of 'b' is as it should be if permuted correctly relative to 'o'
        if(intendedIndex === indexOfR){  // if the index of 'g' and the intended index match, the two pieces are permuted correctly relative to each other; no moves required;
          console.log('orange and red are permuted correctly relative to each other')

        }else{ // relative to piece 'o', piece 'b' is incorrectly permuted
// if they are not permuted correctly relative to each other then calculate how far how many index positions 'b is away from its destination 
        }
          }else{ // the remaining colour must be BLUE
            let indexOfB = crossEdgeArray[1].index  // 'b' is two index positions in front 'o'
            // variable for position of correctly permuted 'b'
            let intendedIndex = (indexOfO + 3)%4
        // check if the index of 'b' is as it should be if permuted correctly relative to 'o'
        if(intendedIndex === indexOfB){  // if the index of 'g' and the intended index match, the two pieces are permuted correctly relative to each other; no moves required;
          console.log('orange and blue are permuted correctly relative to each other')
        }else{ // relative to piece 'o', piece 'b' is incorrectly permuted

        }


          }







}

break;
case 3:
  break;
  case 4:
    break;
  
    }

  

}else{
  checkNonOrientedCrossPieces()


}

}


  function checkCrossPieceMidLayer(){
    orientedCrossEdgeArray = []
// variable for the number of oriented cross pieces
let crossPieces = 0;
// variable for the number name of the slot where the cross piece sits
let crossPiecePosition; 
        // check if there are any white cross pieces on the bottom layer
        midLayerEdges.forEach((edge, index) =>{
          console.log(edge)


          if( edge[0] == 'w'|| edge[1] == 'w'){
            // if either of the edge's facets is white incriment the cross pieces
    crossPieces ++;
    crossEdgeArray.push({
      'index': index,
      'cross_piece': edge, 
      'piece position':crossPiecePosition
    })
          }
        })

        // console.log(crossEdgeArray)
  }

  function checkCrossUpLayer(){

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
      checkCrossPieceMidLayer()
    }

}