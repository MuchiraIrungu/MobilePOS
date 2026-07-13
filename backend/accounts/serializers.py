from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Shop, Staff

User = get_user_model()

class UserLoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token
    
    def validate(self, data):
        try:
            data = super().validate(data)
        except:
            raise serializers.ValidationError(
                {
                    'detail': 'Invalid Credentials. Please try again.'
                }
            )
        
        if not self.user.is_active:
            raise serializers.ValidationError(
                {
                    'detail':'This account has been deactivated'
                }
            )

        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'role': self.user.role,
        }

        return data

class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        max_length=200, 
        min_length=10, 
        write_only=True,
        required=True,
        validators=[validate_password])
    password2 = serializers.CharField(
        max_length=200, 
        min_length=10, 
        write_only=True,
        required=True,
        validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['id','email','first_name','last_name','role','password1','password2','is_active','date_joined']
        read_only_fields = ['id','date_joined']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Password do not match')
        return data

    def create(self,validated_data):
        password1 = validated_data.pop('password1')
        validated_data.pop('password2')

        validated_data['role'] = User.ROLE_CASHIER
        user = User(**validated_data)
        user.set_password(password1)
        user.save()
        return user

    def update(self, instance, validated_data):

        password = validated_data.pop('password1', None)
        validated_data.pop('password2', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()

        return instance
    
class UserSerializerList(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.get_full_name()
    
    class Meta:
        model = User
        fields = ['id','full_name','email','is_active']

class ShopSerializer(serializers.ModelSerializer):
    staff_count = serializers.SerializerMethodField()

    def get_staff_count(self, obj):
        return obj.staff_members.filter(is_active=True).count()

    class Meta:
        model = Shop
        fields = ['id', 'name', 'email', 'phone', 'location', 'is_active', 'staff_count', 'created_at']
        read_only_fields = ['id', 'created_at']


class StaffSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.SerializerMethodField()
    shop_name = serializers.CharField(source='shop.name', read_only=True)
    managed_by_name = serializers.SerializerMethodField()

    def get_full_name(self, obj):
        return obj.user.get_full_name()

    def get_managed_by_name(self, obj):
        if obj.managed_by:
            return obj.managed_by.user.get_full_name()
        return None

    class Meta:
        model = Staff
        fields = [
            'id', 'email', 'full_name', 'shop', 'shop_name',
            'role', 'phone', 'is_active', 'managed_by',
            'managed_by_name', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class StaffCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = Staff
        fields = ['email', 'password', 'first_name', 'last_name', 'shop', 'role', 'phone', 'managed_by']

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        staff = Staff.objects.create(user=user, **validated_data)
        return staff