from django.contrib import admin
from django.db import models
from django.forms import TextInput

from language.models import Language


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'macroarea',
                ('family', 'subfamily', 'genus'),
                ('latitude', 'longitude'),
                'hidden',
            )
        }),
    )
    list_display = [
        'name',
        'macroarea',
        'family',
        'subfamily',
        'genus',
        'latitude',
        'longitude',
        'hidden',
    ]
    list_editable = ['hidden']
    list_filter = ['hidden']
    search_fields = [
        'name',
        'family__name',
        'subfamily__name',
        'genus__name',
    ]
    formfield_overrides = {
        models.TextField: {'widget': TextInput},
    }
