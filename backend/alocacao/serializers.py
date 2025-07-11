from rest_framework import serializers
from .models import Alocacao

class AlocacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alocacao
        fields = '__all__'
        read_only_fields = ['usuario']

    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)

