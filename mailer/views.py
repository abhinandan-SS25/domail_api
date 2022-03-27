from django.shortcuts import render
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from .models import User, Email, Groups

@csrf_exempt
def compose(request):

    # Composing a new email must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    auth_login(request)

    # Check recipient emails
    data = json.loads(request.body)
    recipients = data.get("recipients")
    if isinstance(recipients,list):
        emails = [email.strip() for email in recipients]
    else:
        emails = [email.strip() for email in recipients.split(",")]
    if emails == [""]:
        return JsonResponse({
            "error": "At least one recipient required."
        }, status=400)

    # Convert email addresses to users
    recipients = []
    for email in emails:
        try:
            user = User.objects.get(email=email)
            recipients.append(user)
        except User.DoesNotExist:
            return JsonResponse({
                "error": f"User with email {email} does not exist."
            }, status=400)

    # Get contents of email
    subject = data.get("subject", "")
    body = data.get("body", "")
    important = data.get("important", False)
    # Create one email for each recipient, plus sender
    users = set()
    users.add(request.user)
    users.update(recipients)
    for user in users:
        email = Email(
            user=user,
            sender=request.user,
            subject=subject,
            body=body,
            read=user == request.user,
            important=important
        )
        email.save()
        for recipient in recipients:
            email.recipients.add(recipient)
        email.save()

    return JsonResponse({"message": "Email sent successfully."}, status=201)

@csrf_exempt
def mailbox(request, mailbox):

    auth_login(request)

    # Filter emails returned based on mailbox
    if mailbox == "inbox":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=False, important=False
        )
    elif mailbox == "sent":
        emails = Email.objects.filter(
            user=request.user, sender=request.user
        )
    elif mailbox == "archive":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, archived=True
        )
    elif mailbox == "important":
        emails = Email.objects.filter(
            user=request.user, recipients=request.user, important=True
        )
    else:
        return JsonResponse({"error": "Invalid mailbox."}, status=400)

    # Return emails in reverse chronologial order
    emails = emails.order_by("-timestamp").all()
    return JsonResponse([email.serialize() for email in emails], safe=False)


@csrf_exempt
@login_required
def email(request, email_id):

    # Query for requested email
    try:
        email = Email.objects.get(user=request.user, pk=email_id)
    except Email.DoesNotExist:
        return JsonResponse({"error": "Email not found."}, status=404)

    # Return email contents
    if request.method == "GET":
        return JsonResponse(email.serialize())

    # Update whether email is read or should be archived
    elif request.method == "PUT":
        data = json.loads(request.body)
        if data.get("read") is not None:
            email.read = data["read"]
        if data.get("archived") is not None:
            email.archived = data["archived"]
        email.save()
        return HttpResponse(status=204)

    # Email must be via GET or PUT
    else:
        return JsonResponse({
            "error": "GET or PUT request required."
        }, status=400)

@csrf_exempt
def accounts(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = data["username"].split("@")[0]
        user_details = User.objects.filter(username=user)

        return JsonResponse([user.serialize() for user in user_details], safe=False)

    else:
        return JsonResponse([user.serialize() for user in User.objects.all()], safe=False)

@csrf_exempt
def contacted (request):

    auth_login(request)

    emails_sent = Email.objects.filter(
            user=request.user, sender=request.user
        ).order_by("-timestamp")[:5]

    print(emails_sent)

    contacted = set()
    for email in emails_sent:
        recipients = {recipient.username for recipient in email.recipients.all()}
        contacted = contacted.union(recipients)

    contacted = list(contacted)[:5]

    return JsonResponse([user.serialize() for user in User.objects.filter(username__in = contacted)], safe=False)

@csrf_exempt
def your_groups (request):

    auth_login(request)

    groups = Groups.objects.filter(Q(creator=request.user, members__in=[request.user]) | Q(members__in=[request.user])).distinct()

    return JsonResponse([group.serialize() for group in groups], safe=False)

@csrf_exempt
def auth_login(request):
    if request.method == "POST":

        f_data = json.loads(request.body)
        # Attempt to sign user in
        email = f_data["email"].split("@")[0]
        password = f_data["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponse("Login successful")
        else:
            return HttpResponse("Invalid credentials")

def auth_logout(request):
    logout(request)
    return HttpResponse("Logout successful")

@csrf_exempt
def auth_register(request):
    if request.method == "POST":

        f_data = json.loads(request.body)
        print(f_data)

        username = f_data["email"]
        email = username + "@domail.com"

        # Ensure password matches confirmation
        password = f_data["password"]
        confirmation = f_data["confirmation"]
        if password != confirmation:
            return HttpResponse("Passwords unmatch")

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = f_data["firstname"]
            user.last_name = f_data["lastname"]
            user.save()
        except IntegrityError as e:
            print(e)
            return HttpResponse("Email pre-exists")
        return HttpResponse("Register successful")

