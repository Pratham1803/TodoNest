import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:todo/screen/login.dart';

final theme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(    
    seedColor: Colors.lightBlue,
    brightness: Brightness.light,
  ),
  textTheme: GoogleFonts.latoTextTheme(),
);

void main() {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: theme,
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.light,
      home: Scaffold(
        body: LoginScreen(),
      ),
    );
  }
}