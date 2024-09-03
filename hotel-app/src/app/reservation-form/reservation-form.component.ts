import { Component,OnInit} from '@angular/core';
import { Form, FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm:FormGroup=new FormGroup({});
  constructor( //dependency injection
    private formBuilder:FormBuilder,
    private reservationService:ReservationService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ){

  }
  ngOnInit():void{
    this.reservationForm = this.formBuilder.group({
      
      checkInDate:["",Validators.required],
      checkOutDate:["",Validators.required],
      guestName:["",Validators.required],
      guestEmail:["",[Validators.required,Validators.email]],
      roomNumber:["",Validators.required]
    })

    let id  = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        let reservation=this.reservationService.getReservation(id);
        
        if(reservation)
          this.reservationForm.patchValue(reservation);
      }
        
  }
  onSubmit(){
    if(this.reservationForm.valid){
      // console.log('valid')
      let reservation:Reservation = this.reservationForm.value;
      let id  = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        // update
        this.reservationService.updateReservation(id,reservation);
      }else{
        // new
        this.reservationService.addReservation(reservation)
      }
      // this.reservationService.addReservation(reservation)
      this.router.navigate(['/list']);
    }
  }
}
