#include <stdio.h>

/*
//==========
// How to emsdk!!
	https://emscripten.org/index.html

//==========
// Install

	1, Get the emsdk repo
		$git clone https://github.com/emscripten-core/emsdk.git

	2, Enter that directory
		$cd emsdk

	3, Fetch the latest version of the emsdk (not needed the first time you clone)
		$git pull

	4, Download and install the latest SDK tools.
		$./emsdk install latest

	5, Make the "latest" SDK "active" for the current user. (writes .emscripten file)
		$./emsdk activate latest

	6, Activate PATH and other environment variables in the current terminal
		$source ./emsdk_env.sh

//==========
// Usage

	1, Create "main.c" file

	2, Enter that "hello" directory
		$cd hello

	3, Compile C!!
		$emcc main.c -o main.html

	4, Run "main.html" with localhost
*/

int main() {
	printf("Hello World\n");
	return 0;
}