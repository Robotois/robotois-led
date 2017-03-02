{
  "targets": [
    {
      "target_name": "LEDModule",
      "sources": [ "LEDModule.cpp","LEDWrapper.cpp",
      "src/Modules/LED/LED.cpp",
      "src/Libraries/DigitalIO/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
