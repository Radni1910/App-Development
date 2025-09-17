package com.example.couterapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    int counter=0;
    TextView tvCounter;
    Button btnIncrement ,btnDecrement,btnReset;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        tvCounter =findViewById(R.id.tvCounter);
        btnIncrement=findViewById(R.id.btnIncrement);
        btnDecrement=findViewById(R.id.btnDecrement);
        btnReset=findViewById(R.id.btnReset);

        btnIncrement.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                counter++;
                tvCounter.setText(String.valueOf(counter));
            }
        });
        btnDecrement.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (counter > 0) counter--;
                tvCounter.setText(String.valueOf(counter));
            }
        });
        btnReset.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                counter=0;
                tvCounter.setText(String.valueOf(counter));

            }
        });
        }
    }
