# Mendix-Low-code-tool-extension

To start witjh the low code tool https://academy.mendix.com/link/modules/582/lectures/4550/2.2.2-Generate-Your-Widget

How to really install everything 


Generate Your Widget

Next, you are going to generate your widget.

    Open you terminal and navigate into the Mendix Project root folder (Using the cd command).

    Create a folder for your pluggable widgets.

mkdir myPluggableWidgets

    Navigate into that newly created folder.

 cd myPluggableWidgets

    Generate the Widget.

Run the following command to create a widget called characterCounter

yo @mendix/widget characterCounter

chnage the current directory to the characterCounter directory. Run the following 

npm run build

The terminal should show success state and a new folder with all the essential file will be created for further development.

Have fun customizing and linking it to your algorithm.
