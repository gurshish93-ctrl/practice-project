from django.db import models

class Employee(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('deleted', 'Deleted'),
    ]

    # Personal Information
    employee_code = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    full_name = models.CharField(max_length=255, blank=True)  # auto-fill in save()
    gender = models.CharField(max_length=10, choices=[('Male','Male'),('Female','Female')])
    nationality = models.CharField(max_length=50)
    marital_status = models.CharField(max_length=20, choices=[('Single','Single'),('Married','Married')])
    date_of_birth = models.DateField()

    # Contact Information
    email = models.EmailField()
    personal_email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    alternate_phone_number = models.CharField(max_length=15, blank=True, null=True)
    emergency_contact = models.CharField(max_length=15)
    blood_group = models.CharField(max_length=5)

    # Address Information
    address = models.TextField()
    permanent_address = models.TextField()
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=10)

    # Employment Details
    project = models.CharField(max_length=255, blank=True, null=True)  # or ManyToMany if multiple projects
    employee_skills = models.CharField(max_length=255, blank=True, null=True)  # could use ManyToMany with Skills model
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    manager = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=50, choices=[('Full Time','Full Time'), ('Part Time','Part Time')])
    work_location = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    joining_date = models.DateField()
    probation_end_date = models.DateField()
    confirmation_date = models.DateField(blank=True, null=True)
    resignation_date = models.DateField(blank=True, null=True)
    last_working_day = models.DateField(blank=True, null=True)
    on_probation = models.BooleanField(default=False)

    # Bank Information
    bank_name = models.CharField(max_length=100, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    pan_card_number = models.CharField(max_length=20, blank=True, null=True)
    pf_number = models.CharField(max_length=20, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)

    # Documents
    last_salary_slip = models.FileField(upload_to="employee_docs/salary_slips/", blank=True, null=True)
    academic_certificate = models.FileField(upload_to="employee_docs/certificates/", blank=True, null=True)
    aadhar_card = models.FileField(upload_to="employee_docs/aadhar/", blank=True, null=True)
    profile_image = models.ImageField(upload_to="employee_docs/profile_images/", blank=True, null=True)

    # Meta
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.full_name = f"{self.first_name} {self.middle_name or ''} {self.last_name}".strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee_code} - {self.full_name}"