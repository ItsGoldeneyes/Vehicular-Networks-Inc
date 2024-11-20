import React from "react";

function SubmittedTickets() {
  return (
    <div>
      <div class="flex h-screen overflow-hidden">
        <div class="w-1/4 bg-white border-r border-gray-300">
          <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 class="text-2xl font-semibold">Tickets</h1>
            <div class="relative">
              <button id="menuButton" class="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </header>

          <div class="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="flex-1">
                <h2 class="text-lg font-semibold">Ticket: 1</h2>
                <p class="text-gray-600">You're welcome...</p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="flex-1">
                <h2 class="text-lg font-semibold">Ticket: 2</h2>
                <p class="text-gray-600">Leave a feedback...</p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="flex-1">
                <h2 class="text-lg font-semibold">Ticket: 3</h2>
                <p class="text-gray-600">HELP!!</p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="flex-1">
                <h2 class="text-lg font-semibold">Ticket: 4</h2>
                <p class="text-gray-600">Thank you!</p>
              </div>
            </div>

            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div class="flex-1">
                <h2 class="text-lg font-semibold">Ticket: 5</h2>
                <p class="text-gray-600">Stupid company</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1">
          <header class="bg-white p-4 text-gray-700">
            <h1 class="text-2xl font-semibold">Ticket: 1</h1>
          </header>

          <div class="h-screen overflow-y-auto p-4 pb-36">
            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>
                  Hello! I’m sorry to hear that you’re experiencing this issue.
                  Let me take a look. Could you tell me which browser you're
                  using and if you’ve tried accessing the page on another
                  device?
                </p>
              </div>
            </div>

            <div class="flex justify-end mb-4 cursor-pointer"></div>
            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>
                  Hi, I'm having trouble with the reward tracking page. It loads
                  very slowly and crashes sometimes.
                </p>
              </div>
            </div>

            <div class="flex mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p class="text-gray-700">
                  Thanks for the details. First, let’s try clearing your
                  browser’s cache and cookies. Sometimes that helps with loading
                  issues. Could you give that a try and let me know if it
                  improves?
                </p>
              </div>
            </div>

            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>
                  Got it, I'll try Firefox. Will I get a notification when the
                  issue is resolved?
                </p>
              </div>
            </div>

            <div class="flex mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p class="text-gray-700">
                  Yes, we’ll keep you updated via email, and you can check the
                  ticket status in the support portal anytime. Apologies for the
                  inconvenience, and thank you for your patience!
                </p>
              </div>
            </div>

            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>
                  Thank you for the help! I’ll keep an eye on the ticket status.
                </p>
              </div>
            </div>

            <div class="flex mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p class="text-gray-700">
                  You're welcome! Let us know if you have any more questions.
                  Have a great day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedTickets;
