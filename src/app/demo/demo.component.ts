import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {
  constructor(private http:HttpClient){
    // this.http.get("http://localhost:3000/posts").subscribe((data)=>{
    //   console.log(data)
    //   this.details=data
    // })
    this.fetchUser()
  }
  demoForm = new FormGroup({
    fName: new FormControl(),
    lName: new FormControl(),
    id:new FormControl()
  });
  details: any = [];
  editForm:boolean=false
  fetchUser(){
    this.http.get("http://localhost:3000/posts").subscribe((data)=>{
      console.log(data)
      this.details=data
    })
  }
  registerUser() {
    this.http.post("http://localhost:3000/posts",this.demoForm.value ).subscribe(
      ()=>{
        this.demoForm.reset()
        this.fetchUser()
      }
    )
    // this.details.push({ ...this.demoForm.value });
    // this.demoForm.reset()
  }
  deleteUser(i:number,user:any) {
    this.http.delete("http://localhost:3000/posts/"+user.id).subscribe(()=>{
      this.details.splice(i,1)
    })
    // this.details.splice(i,1)
  }

  editUser(i:number,user:any) {
    this.editForm=true
    // this.demoForm.setValue({fName:"ritik",lName:"fsdfa"})
    console.log(user)
    this.demoForm.setValue(user)
  }
  updateUser(){
    this.editForm=false
    let userExit=this.details.findIndex((obj:any)=>{
      return obj.id===this.demoForm.value.id
    })
    this.http.put(`http://localhost:3000/posts/${this.demoForm.value.id}`,this.demoForm.value ).subscribe(
      ()=>{
        this.details[userExit]={...this.demoForm.value}
        this.demoForm.reset()
      }
    )
    // this.details[userExit]={...this.demoForm.value}
    // this.demoForm.reset()
    console.log("details",this.details)
  }
}
