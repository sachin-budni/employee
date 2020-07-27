import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from './../service/employee.service';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public errors: WebcamInitError[] = [];
  requiredAlert = 'Field is mandatory*';
  public webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      profilePic: ['', [Validators.required, Validators.minLength(4)]]
    });
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.employeeForm.controls.profilePic.setValue(this.webcamImage.imageAsDataUrl);
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  onSubmit(value): any {
    const id = uuid.v4();
    const emp = {...value, id };
    this.empService.addEmployee(emp);
  }

  reset(): void {
    this.employeeForm.reset();
    this.webcamImage = null;
  }
}
