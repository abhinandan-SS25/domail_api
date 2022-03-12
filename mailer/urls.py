from django.urls import path

from . import views

urlpatterns = [
    path("login", views.auth_login, name="auth_login"),
    path("logout", views.auth_logout, name="auth_logout"),
    path("register", views.auth_register, name="auth_register"),
    path("emails", views.compose, name="compose"),
    path("emails/<int:email_id>", views.email, name="email"),
    path("emails/<str:mailbox>", views.mailbox, name="mailbox"),
]
