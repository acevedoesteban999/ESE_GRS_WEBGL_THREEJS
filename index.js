import * as THREE from './Threejs/three.module.js';
import { OrbitControls } from './Threejs/OrbitControls.js';
import { OBJLoader } from './Threejs/OBJLoader.js';
import { MTLLoader } from './Threejs/MTLLoader.js';
var scene,camera,renderer;
var obj=new Array(13),loader,loaderMTL;
var control;
var angules=new Array(6),EndCarga=false;
var Rot=true;
angules[0]=0;
angules[1]=13.8*Math.PI/180;
angules[2]=44.5*Math.PI/180;
angules[3]=-2.04*Math.PI/180;
angules[4]=90*Math.PI/180;
angules[5]=2.04*Math.PI/180;

/////////////EVENTOS//////////////////////  
document.getElementById('btnAdd1').addEventListener("click",()=>{angules[0]+=15*Math.PI/180,ActAngules();
    }
)
document.getElementById('btnAdd2').addEventListener("click",()=>{angules[1]+=15*Math.PI/180,ActAngules();
    }
)
document.getElementById('btnAdd3').addEventListener("click",()=>{angules[2]+=15*Math.PI/180,ActAngules();
    }
)
document.getElementById('btnAdd4').addEventListener("click",()=>{angules[3]+=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd5').addEventListener("click",()=>{angules[4]+=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd6').addEventListener("click",()=>{angules[5]+=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd7').addEventListener("click",()=>{angules[0]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd8').addEventListener("click",()=>{angules[1]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd9').addEventListener("click",()=>{angules[2]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd10').addEventListener("click",()=>{angules[3]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd11').addEventListener("click",()=>{angules[4]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('btnAdd12').addEventListener("click",()=>{angules[5]-=15*Math.PI/180,ActAngules();}
)
document.getElementById('Redirecc').addEventListener("click",()=>{Redirecc();}
)
document.getElementById("autRot").addEventListener("click",()=>{
    Rot=document.getElementById("autRot").checked;
})

window.addEventListener(
    'resize',()=>{
        console.log('asd');
        camera.aspect=GetSize();
        camera.updateProjectionMatrix();
        renderer.setSize(GetSizeW(),GetSizeH());
        renderer.render(scene,camera);
    })
/////////////FUNCTIONS////////////////////
function init()
{
    scene=new THREE.Scene();
    scene.background=new THREE.Color(0x2a3b4c);
    camera=new THREE.PerspectiveCamera(75,GetSize());
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(GetSizeW(),GetSizeH());
    document.getElementById("threejs").appendChild(renderer.domElement);    
    control=new OrbitControls(camera,renderer.domElement);
    camera.position.z=500;
    scene.rotateX(45);
    let ligth=new THREE.AmbientLight(0xffffff);
    ligth.position.set(0,0,0);
    scene.add(ligth);
    scene.rotateX(10);
}
function loAd()
{

    loader=new Array(13);
    loaderMTL=new MTLLoader();
    var end=0;
    for(let i=0;i<13;i++)
    {
        loaderMTL.load(
            "./obj/"+(i+1)+".mtl",
            function(mtl)
            {
                mtl.preload();
                loader[i]=new OBJLoader();
                loader[i].setMaterials(mtl);
                loader[i].load(
                    "./obj/"+(i+1)+".obj",
                    function(model)
                    {
                        obj[i]=model;
                        //obj[i].visible=false;
                        scene.add(obj[i]);
                        if((++end)==13)
                        {
                        EndCarga=true;
                        ActAngules();
                        }
                    }
                    )
            }
        )
        
    }
        
        
        

}
function ActAngules()
{
    for(let i=0;i<13;i++)
    {
        switchActAngules(i,i);
    }

}
function switchActAngules(i,ii)
{
    switch(i)
        {
            case 0:
                for(let i=0;i<13;i++)
                {
                    obj[i].position.x=0;
                    obj[i].position.y=0;
                    obj[i].position.z=0;
                    obj[i].rotation.x=0;
                    obj[i].rotation.y=0;
                    obj[i].rotation.z=0;
                }
                break;
            case 1:
                obj[ii].translateZ(-0.25);
                break;
            case 2:
                switchActAngules(i-1,ii);    
                obj[ii].translateZ(7.45);
                obj[ii].rotateZ(angules[0]);
                break;
             case 3:
                switchActAngules(i-1,ii);   
                obj[ii].translateZ(36.5);
                obj[ii].translateY(-18.2);
                obj[ii].rotateY(angules[1]);
                break;
            case 4:
                switchActAngules(i-1,ii);
                obj[ii].translateY(0.5);
                break;
            case 5:
                switchActAngules(i-1,ii);
                obj[ii].translateX(-150);
                obj[ii].rotateY(angules[2]);
                break;
            case 6:
                switchActAngules(i-1,ii);
                obj[ii].translateY(12.3);
                break;
            case 7:
                switchActAngules(i-1,ii);
                obj[ii].translateZ(200);
                break;
            case 8:
                switchActAngules(i-1,ii);
                obj[ii].translateY(7.716);
                obj[ii].translateZ(25.5);
                obj[ii].rotateX(angules[3]);
                break;
            case 9:
                switchActAngules(i-1,ii);
                obj[ii].translateZ(53);
                obj[ii].rotateY(angules[4]);
                break;
                case 10:
                    switchActAngules(i-1,ii);
                    obj[ii].translateY(-8.915);
                    obj[ii].translateZ(35);
                    obj[ii].rotateZ(angules[5]);
                    break;
                case 11:
                    switchActAngules(i-1,ii);
                    obj[ii].translateZ(6);
                    break;
                case 12:
                    switchActAngules(i-1,ii);
                    obj[ii].translateX(142.696);
                    obj[ii].translateZ(10.645);
                    break;
            default:
                obj[i].translateZ(50*i);
                break;
            
        }  
}
function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    if(EndCarga && Rot)
    { 
        angules[0]+=0.01;
        ActAngules();
    }
    
    
    
}
function GetSize()
{
    return (GetSizeW())/GetSizeH();
}
function GetSizeH()
{
    let toReturn=window.innerHeight-window.innerHeight*0.05-document.getElementById("row1").clientHeight-document.getElementById("row2").clientHeight;
    if(toReturn<500)
        return 500;
    return toReturn; 
}
function GetSizeW()
{
    if(window.innerWidth<500)
    return 500;
    return window.innerWidth;
}
function Redirecc()
{
    angules[0]=0;
    angules[1]=13.8*Math.PI/180;
    angules[2]=44.5*Math.PI/180;
    angules[3]=-2.04*Math.PI/180;
    angules[4]=90*Math.PI/180;
    angules[5]=2.04*Math.PI/180;
    ActAngules();
}

//////////////Main////////////////////
loAd();
init();
animate();
// // var rotRed=145,rotBlue=45;
//    var geometry=new THREE.BoxGeometry();
//    var material=new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});
//    var cubegreen=new THREE.Mesh(geometry,material);
//    scene.add(cubegreen);
//   cubegreen.matrixAutoUpdate=false;
//   cubegreen.translateZ(-100);
//   cubegreen.translateZ(-100);
//   cubegreen.updateMatrix();
//   cubegreen.matrix.identity();
// var geometry1=new THREE.BoxGeometry();
// var material1=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(255,0,0)"), wireframe:true});
// var cubered=new THREE.Mesh(geometry1,material1);
// scene.add(cubered);
// var geometry1=new THREE.BoxGeometry();
// var material1=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(0,0,255)"), wireframe:true});
// var cubeblue=new THREE.Mesh(geometry1,material1);
// scene.add(cubeblue);
// cubered.rotateX(rotRed);
// cubered.translateX(3);
// cubeblue.rotateX(rotRed);
// cubeblue.translateX(3);
// cubeblue.rotateZ(rotBlue);
// cubeblue.translateZ(4);
// var matrix=new THREE.Matrix4();
// var matrix1=new THREE.Matrix3();