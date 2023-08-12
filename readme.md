nohup python -m http.server 8042 > server.log 2>&1 &
disown
ps aux | grep "python -m http.server"
kill <PID>
