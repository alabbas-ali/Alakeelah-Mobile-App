# Alakeelah-Mobile-App

Generate key command:

keytool -genkey -v -keystore i2host_com.keystore -alias i2host -keyalg RSA -keysize 2048 -validity 10000

Sign Jar command:

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore i2host_com.keystore <APK_NAME>.apk i2host

Align APK command:

./zipalign 8 <input_APK> <output_apk>
